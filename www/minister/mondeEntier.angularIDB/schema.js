function appConfig() {

	return {
		"defaults": {
			"views": {
				"details": {"modules": ["action", "initForm", "getPicture"], "action": []},
				"list": {"modules": ["action"], "action": []}
			}
		},
		"lists": {
			"view": {
				"details": {"title": "Group details"},
				"list": {"title": "Group list"}
			}
		},
		"users": {
			"view": {
				"details": {"title": "User details"},
				"list": {"title": "Users list"}
			}
		}
	};
}

function appSchema() {
	return {
		"brands": {
			"name": "brand",
			"title": "List camera brands",
			"description": "The schema description for the brands store",
			"properties": {
				"name": {"type": "string", "pk": true},
				"ref": {"type": "array", "ndx": "refCategoryBrand", "multiEntry":true},
				"models": {"type": "object", "unique": "modelName", "keyPath": "models.name", "multiEntry":true},
				"description": {"type": "string"},
				"created_at": {"type": "datetime"},
				"updated_at": {"type": "datetime"}
			},
			"additionalProperties": false,
			"required": ["name"]
		},
		"cards": {
			"name": "card",
			"title": "List camera card details",
			"description": "The schema description for the card store",
			"properties": {
				"cardSpeed": {"type": "string", "pk": true},
				"description": {"type": "string"},
				"cardType": {"type": "string"},
				"img": {"type": "string"},
				"created_at": {"type": "datetime"},
				"updated_at": {"type": "datetime"}
			},
			"additionalProperties": false,
			"required": ["name", "cardType", "img"]
		},
		"categories": {
			"name": "category",
			"title": "List camera categories",
			"description": "The schema description for the category store",
			"properties": {
				"name": {"type": "string", "pk": true},
				"description": {"type": "string"},
				"created_at": {"type": "datetime"},
				"updated_at": {"type": "datetime"}
			},
			"additionalProperties": false,
			"required": ["name"]
		},
		"config": {
			"name": "config",
			"title": "Configuration store",
			"description": "Contains the setting for the application",
			"properties": {
				"name": {"type": "string", "pk": true},
				"type": {"type": "string"},
				"created_at": {"type": "datetime"},
				"updated_at": {"type": "datetime"}
			},
			"require": ["name"],
			"additionalProperties": true,
		},
		"models": {
			"name": "model",
			"title": "List lexar card model",
			"description": "The schema description for the models store",
			"properties": {
				"name": {"type": "string", "pk": true},
				"ref": {"type": "array", "ndx": "refBrandModel", "multiEntry":true},
				"description": {"type": "string"},
				"created_at": {"type": "datetime"},
				"updated_at": {"type": "datetime"}
			},
		"additionalProperties": false,
			"required": ["name"]
	},
		"offline": {},
		"users": {
			"name": "users",
			"title": "Users schema",
			"description": "The schema description for the users store",
			"properties": {
				"firstname": {"type": "string", "key": "indexFirsrame"},
				"surname": {"type": "string", "key": "indexLastame"},
				"contact": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"email": {"type": "string"},
							"number": {"type": "string"},
							"type": {"$ref": "#/definitions/contactType"}
						}
					},
					"indexes": [
						{"unique": "uniqEmail", "keyPath": "contact.email"},
						{"unique": "uniqContact", "keyPath": "contact.number"}
					]
				},
				"created_at": {"type": "datetime"},
				"updated_at": {"type": "datetime"}
			},
			"additionalProperties": true,
			"required": ["firstname", "lastname", "email"],
			"definitions": {
				"contactType": {"type": "string", "enum": ["personal", "work", "secondary", "other"]}
			}
		}
	}
}

function dataSchema() {
	return {
		"brands": {
			"data": [
				{
					"name": "Nikon", "ref": ["DSLR"], "models": []
				}
				//{
				//	"name": "Cannon", "ref": ["DSLR"], "models": []
				//}
			],
			"found": true
		},
		"cards":{
			"data":[
				{
					"cardType": "SD",
					"cardSpeed": "633x UHS-I",
					"description":"High-speed 633x/95mbs, UHS-I and Class 10 rated for full-HD video, Supplied with Secure Erase software to maximise card performance, Limited lifetime warranty",
					"img": ["Professional 16GB SDHC 633x UHS-I", "Professional 32GB SDHC 633x UHS-I", "Professional 64GB SDXC 633x UHS-I", "Professional 128GB SDXC 633x UHS-I"]
				},
				{
					"cardType": "SD",
					"cardSpeed": "633x UHS-II",
					"description": "High-speed 633x/95mbs, UHS-I and Class 10 rated for full-HD video, Supplied with Secure Erase software to maximise card performance, Limited lifetime warranty",
					"img": ["Professional 16GB SDHC 633x UHS-I", "Professional 32GB SDHC 633x UHS-I", "Professional 64GB SDXC 633x UHS-I", "Professional 128GB SDXC 633x UHS-I"]
				},
				{
					"cardType": "CF",
					"cardSpeed": "800x VPG 20",
					"description": "",
					"img": ["Professional 16GB CF 800x UDMA 7","Professional 32GB CF 800x UDMA 7","Professional 64GB CF 800x UDMA 7","Professional 128GB CF 800x UDMA 7"]
				},
				{
					"cardType": "CF/SD",
					"cardSpeed": "1000x UHS-I",
					"description": "",
					"img": ["Professional 16GB SDHC 1000x UHS-II","Professional 32GB SDHC 1000x UHS-II","Professional 64GB SDXC 1000x UHS-II","Professional 128GB SDXC 1000x UHS-II"]
				},
				{
					"cardType": "SD",
					"cardSpeed": "1000x UHS-II",
					"description": "High-speed 633x/95mbs, UHS-I and Class 10 rated for full-HD video, Supplied with Secure Erase software to maximise card performance, Limited lifetime warranty",
					"img": ["Professional 16GB SDHC 1000x UHS-II","Professional 32GB SDHC 1000x UHS-II","Professional 64GB SDXC 1000x UHS-II","Professional 128GB SDXC 1000x UHS-II"]
				},
				{
					"cardType": "SD",
					"cardSpeed": "2000x UHS-II",
					"cardImg": "5DS",
					"description": "High-speed 2000x/300mbs, UHS-II and Class 10 rated for full-HD video, Supplied with Secure Erase software to maximise card performance, Supplied with UHS-II USB 3.0 reader, Limited lifetime warranty",
					"img": ["Professional 32GB SDHC 2000x UHS-II", "Professional 64GB SDXC 2000x UHS-II","Professional 128GB SDXC 2000x UHS-II"]
				},
				{
					"cardType": "CF",
					"cardSpeed": "1066x VPG 65",
					"description": "High-speed 1066x/160mbs, VPG65 rated for 4K and full-HD video, Supplied with Secure Erase software to maximise card performance, Limited lifetime warranty",
					"img": ["Professional 16GB CF 1066x UDMA 7","Professional 32GB CF 1066x UDMA 7","Professional 64GB CF 1066x UDMA 7","Professional 128GB CF 1066x UDMA 7","Professional 256GB CF 1066x UDMA 7"]
				},
				{
					"cardType": "Cfast",
					"cardSpeed": "3500x Cfast",
					"description": "",
					"img": ["Professional 32GB SDHC 2000x UHS-II","Professional 64GB SDXC 2000x UHS-II","Professional 128GB SDXC 2000x UHS-II"]
				},
				{
					"cardType": "SD",
					"cardSpeed": "300x Class 10",
					"description": "High-speed 300x/45mbs, UHS-I and Class 10 rated for full-HD video, Limited lifetime warranty",
					"img": "32GB Premium 300x SD UHS-I"
				},
				{
					"cardType": "XQD",
					"cardSpeed": "XQD 1333x",
					"description": "",
					"img": "64GB Professional XQD 1333x"
				},
        {
					"cardType": "XQD",
					"cardSpeed": "XQD 1400x",
					"description": "High-speed 1400x/210mbs, Optimised for 4K and full-HD video, Supplied with Secure Erase software to maximise card performance, Limited lifetime warranty",
					"img": ["Professional 32GB XQD 1400x","Professional 64GB XQD 1400x"]
				}
			],
			"found":true
		},
		"categories": {
			"data": [
				{"name": "DSLR", "enabled": true},
				{"name": "BRIDGE", "enabled": false},
				{"name":"COMPACT", "enabled": false},
				{"name":"ACTION", "enabled": false},
				{"name":"OTHER", "enabled": false}
			],
			"found": true
		},
		"models":{
			"data":[
				{
					"name": "D3100",
					"feature": "14 Megapixel, No video capability, 3fps continuous shooting",
					"description": "Easily capture the beauty of life’s fleeting moments with Nikon’s compact and lightweight D3100—a feature-rich digital SLR camera that surprises you with simplicity, and positively delights with superb results.",
					"card": ["300x Class 10"],
					"ref":["Nikon"],
					"img": "D3100"
				},
				{
					"name": "D3200",
					"feature": "24 Megapixel DX Senso, Full-HD Video(30fps), 4fps continuous shooting ",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Nikon"],
					"img": "D3200"
				},
				{
					"name": "D3300",
					"feature": "24 Megapixel DX Sensor, Full-HD Video(60fps), Wireless Capability, 4fps continuous shooting",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Nikon"],
					"img": "D3300"
				},
				{
					"name": "D5100",
					"feature": "16 Megapixel DX Sensor, Full-HD Video(30fps), 4fps continuous shooting",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Nikon"],
					"img": "D5100"
				},
				{
					"name": "D5200",
					"feature": "24 Megapixel DX Sensor, Full-HD Video(30fps), 4fps continuous shooting",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Nikon"],
					"img": "D5200"
				},
				{
					"name": "D5300",
					"feature": "24 Megapixel DX Sensor, Full-HD Video(60fps), Wireless Capability, 5fps continuous shooting",
					"description": "",
					"card": ["633x UHS-II"],
					"ref":["Nikon"],
					"img": "D5300"
				},
				{
					"name": "D5500",
					"feature": "24 Megapixel DX Sensor, Full-HD Video(60fps), Wireless Capability, 5fps continuous shooting",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Nikon"],
					"img": "D5500"
				},
				{
					"name": "D7000",
					"feature": "16 Megapixel DX Sensor, Full-HD Video(30fps), 6fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Nikon"],
					"img": "D5500"
				},
				{
					"name": "D7100",
					"feature": "24 Megapixel DX Sensor, Full-HD Video(60fps), 6fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Nikon"],
					"img": "D7100"
				},
				{
					"name": "D600",
					"feature": "24 Megapixel FX Sensor, Full-HD Video(30fps), 5.5fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Nikon"],
					"img": "D600"
				},
				{
					"name": "D610",
					"feature": "24 Megapixel FX Sensor, Full-HD Video(30fps), 6fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Nikon"],
					"img": "D610"
				},
				{
					"name": "D750",
					"feature": "24 Megapixel FX Sensor, Full-HD Video(60fps), 6.5fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["2000x UHS-II"],
					"ref":["Nikon"],
					"img": "D750"
				},
				{
					"name": "D800",
					"feature": "36 Megapixel FX Sensor, Full-HD Video(30fps), 4fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1066x VPG 65", "1000x UHS-II"],
					"ref":["Nikon"],
					"img": "D800"
				},
				{
					"name": "D810",
					"feature": "36 Megapixel FX Sensor, Full-HD Video(60fps), 5fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1066x VPG 65", "2000x UHS-II"],
					"ref":["Nikon"],
					"img": "D810"
				},
				{
					"name": "Df",
					"feature": "16 Megapixel FX Sensor, no Video functionality, 5.5fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Nikon"],
					"img": "Df"
				},
				{
					"name": "D4",
					"feature": "16 Megapixel FX Sensor, Full-HD Video(60fps), 10fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1066x VPG 65", "XQD 1333x"],
					"ref":["Nikon"],
					"img": "D4S"
				},
				{
					"name": "D4S",
					"feature": "16 Megapixel FX Sensor, Full-HD Video(60fps), 11fps continuous shooting, Dual memory card slots",
					"description": "",
					"card": ["1066x VPG 65", "XQD 1333x"],
					"ref":["Nikon"],
					"img": "D4S"
				},
				{
					"name": "1200D",
					"feature": "18 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Cannon"],
					"img": "1200D"
				},
				{
					"name": "600D",
					"feature": "18 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Cannon"],
					"img": "600D"
				},
				{
					"name": "650D",
					"feature": "18 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Cannon"],
					"img": "650D"
				},
				{
					"name": "750D",
					"feature": "24 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Cannon"],
					"img": "750D"
				},
				{
					"name": "760D",
					"feature": "24 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Cannon"],
					"img": "760D"
				},
				{
					"name": "70D",
					"feature": "20 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["633x UHS-I"],
					"ref":["Cannon"],
					"img": "70D"
				},
				{
					"name": "7D MKI",
					"feature": "18 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["800x VPG 20"],
					"ref":["Cannon"],
					"img": "7D"
				},
				{
					"name": "7D MKII",
					"feature": "20 Megapixel, Full-HD Video(60fps)",
					"description": "",
					"card": ["800x VPG 20","1000x UHS-I"],
					"ref":["Cannon"],
					"img": "7D MKII"
				},
				{
					"name": "6D",
					"feature": "20 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["1000x UHS-II"],
					"ref":["Cannon"],
					"img": "6D"
				},
				{
					"name": "5D MKII",
					"feature": "21 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["800x VPG 20"],
					"ref":["Cannon"],
					"img": "5D MKII"
				},
				{
					"name": "5D MKIII",
					"feature": "22 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["1066x VPG 65","1000x UHS-II"],
					"ref":["Cannon"],
					"img": "5D MKIII"
				},
				{
					"name": "5DS",
					"feature": "51 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["1066x VPG 65","2000x UHS-II"],
					"ref":["Cannon"],
					"img": "5DS"
				},
				{
					"name": "5DSR",
					"feature": "51 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["1066x VPG 65","2000x UHS-II"],
					"ref":["Cannon"],
					"img": "5DSR"
				},
				{
					"name": "1DX",
					"feature": "18 Megapixel, Full-HD Video(30fps)",
					"description": "",
					"card": ["1066x VPG 65"],
					"ref":["Cannon"],
					"img": "1DX"
				},
				{
					"name": "1DC",
					"feature": "18 Megapixel, 4K Video(24fps)",
					"description": "",
					"card": ["1066x VPG 65"],
					"ref":["Cannon"],
					"img": "1DC"
				},
				{
					"name": "XC10",
					"feature": "12 Megapixel, 4K Video(30fps)",
					"description": "",
					"card": ["3500x Cfast","2000x UHS-II"],
					"ref":["Cannon"],
					"img": "XC10"
				}
			],
			"found":true
		}
	};
}