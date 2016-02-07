var WORK = self;
self.importScripts('schema.js', 'methods.js');
var jsonCallback = function (data){
	console.log('jsonCallback',data);
	return data;
};
var sch = self.importScripts('schema.json?callback=jsonCallback');

self.onconnect = function (e) {
	var port = e.port[0];
	console.log("onConnect", e, e.data, e.port);
};

self.addEventListener('message', function (e) {
	var $data      = e.data;
	var $dbName    = $data.dbName;
	var $siteUrl   = $data.siteUrl;
	var $siteApi   = $data.siteApi;
	var $dataUrl   = $data.dataUrl || false;
	var $dbVersion = $data.dbVersion || 1;
	var $options   = $data.options || {};
	var _default   = {};

	$options = merge(_default, $options);

	switch ($data.call) {
		case "upgrade":
			iAmDB($dbName, $dbVersion);
			break;

		default:
			break;
	}

	function close() {
		console.log("Closing after finish upgrade:: Timer");
		post('close');
		self.close();
	}

	function backup(idb, callback) {
		//@todo: read and backup data to filesystem
		callback();
	}

	function iAmDB(dbName, dbVersion) {
		var idb;
		var iRequest  = self.indexedDB.open(dbName, parseInt(dbVersion));
		var that      = this;
		var upgrading = false;
		var iDB;

		iRequest.onblocked      = blocked;
		iRequest.onerror        = error;
		iRequest.onsuccess      = success;
		iRequest.onupgradeneeded= upgrade;

		function blocked(e) {
			console.log("Closing worker::Please close all other tabls with that application", e);
			self.close();
		}

		function error(e) {
			console.log("Closing worker::Database error code: " + e.target.error.message);
			self.close();
		}

		function success(e) {
			var profile;
			var stores = [];

			console.log("Worker iDB Ready/Success");
			idb = idb || e.target.result || iRequest.result;
			iDB = new indexDB(idb);

			for (profile in appSchema()) {
				if (profile === 'caecus' || profile === 'offline') continue;
				stores.push(profile);
			}

			//place the addition of data in seperate loop, in order to prevent `transaction running`
			if (upgrading === true && typeof $dataUrl === "string") {
				aSync($dataUrl, {}, callback);

			} else if (upgrading === true && typeof $dataUrl === "object") {
				callback({"notitia":$dataUrl});

			} else if(upgrading === true) {
				callback({"notitia":dataSchema()});
			}
			//if upgrading

			function callback(e) {
				var data, single, store, len, x, len1, x1;
				if (e && typeof e.notitia === 'undefined') {
					console.log("could not auto update iDB on upgrade", e);
					return false;
				}

				data = e.notitia;
				len = stores.length;
				for (x = 0; x < len; x++) {
					var profile = stores[x];
					if (!data[profile]) continue;

					store = data[profile];
					if (store.found === false || !isset(store.data)) {
						console.log("Store not found " + profile, store);
						continue;
					}

					len1 = store.data.length;
					for (x1 = 0; x1 < len1; x1++) {
						single = store.data[x1];
						if(typeof single === 'object'){
							single.created_at = new Date();
							single.updated_at = new Date();
						}
						iDB.iWrite(profile, single, false, close);
					}
				}//endfor
			}//callback

			upgrading = false;
		}

		function upgrade(e) {
			var current;
			var ndx;
			var profile;
			var schema;
			var store;
			var multiEntry;
			var x     = 0, l;
			idb       = e.target.result || iRequest.result;
			upgrading = true;
			iDB       = new indexDB(idb);
			console.log("Worker iDB Upgrading");

			backup(idb, createStores);

			function createStores() {
				for (profile in appSchema()) {

					schema= appSchema()[profile];
					store = null;
					//console.log("SCHEMA", profile, idb.objectStoreNames.contains(profile), schema);

					if (!schema.hasOwnProperty('properties')) continue;
					if (idb.objectStoreNames.contains(profile) !== true) {//NEW store schema
						console.log("Creating store:", profile);

						for (var field in schema.properties) {
							current = schema.properties[field];
							if (current.pk && !store)  store = iRequest.result.createObjectStore(profile, {keyPath: field});
							else if (!store)           store = iRequest.result.createObjectStore(profile, {autoIncrement: true});

							ndx       = current.ndx || current.index || current.key;
							multiEntry= current.multiEntry||false;

							if (current.unique) {
								store.createIndex( typeof current.unique === 'string'? current.unique:'uniq_' + field, current.keyPath || field, {unique: true, "multiEntry":multiEntry});
							}//keyname,keypath
							if (ndx) {
								store.createIndex(ndx, current.keyPath || field, {"multiEntry":multiEntry});
							}
						}//for field in mensa.fields

					} else {//to UPDATE the object store's index
						console.log("Updating store:", profile);

						store = (iRequest.transaction) ? iRequest.transaction.objectStore(profile) : e.currentTarget.transaction.objectStore(profile);
						l     = store.indexNames.length;
						if (true) {
							store.clear();
						}//removing all records from the object store and removing all records in indexes that reference the object store

						for (; x < l; x++) {
							//console.log("INdexName", store.indexNames, store.indexNames[x]);
							if (typeof store.indexNames[x] === 'string') store.deleteIndex(store.indexNames[x]);
						}//remove all indexs

						for (field in schema.properties) {
							current = schema.properties[field];
							//console.log("Current", field, current);

							ndx       = current.ndx || current.index || current.key;
							multiEntry= current.multiEntry||false;
							try {
								if (current.unique && !objSearch(store.indexNames, current.unique)) {
									store.createIndex(typeof current.unique === 'string'? current.unique:'uniq_' + field, current.keyPath || field, {unique: true,"multiEntry":multiEntry});
								}
								if (ndx && !objSearch(store.indexNames, ndx)) {
									store.createIndex(ndx, current.keyPath || field, {"multiEntry":multiEntry});
								}

								//Index sub field
								if (current.indexes) {
									var subLen = current.indexes.length;
									var subx = 0;
									var subIndex;
									for (; subx < subLen; subx++) {
										subIndex = current.indexes[subx];
										//console.log("SUB", subIndex);

										if (subIndex.unique && !objSearch(store.indexNames, subIndex.unique)) {
											store.createIndex(subIndex.unique, subIndex.keyPath || field, {unique: true});
										}
										if (ndx && !objSearch(store.indexNames, ndx)) {
											store.createIndex(ndx, subIndex.keyPath || field);
										}
									}
								}
							} catch (e) {
								deb("An error occured in creating the index::" + e.message, field, e)
							}

						}//for field in mensa.fields
					}
					iRequest.transaction.onerror = function (e) {
						deb("A database error code: " + e.target.errorCode, e);
					}
				}// for in appSchema
			}// createStore func
		}// upgrade func
	}// iAmDB func

	function schemaDecypher(data) {
		console.log(data);
	}


});

//@todo: bulk array insert/update
