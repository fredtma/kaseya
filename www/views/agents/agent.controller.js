"use strict";
angular.module('DEI')
    .controller('agentCreateCtrl',agentCreateCtrl)
    .controller('agentListCtrl',agentListCtrl);

agentCreateCtrl.$inject = ['$ionicPopup', 'myValue', 'resource', '$scope', 'ScopeInit', '$state'];
function agentCreateCtrl($ionicPopup, myValue, resource, $scope, ScopeInit, $state)
{
    var Api  = resource.init('soap/agent/:group', {"group":"@GroupName"});
    var agent;
    ScopeInit.init($scope,alpha);

    function alpha($scope)
    {
        agent                   = myValue.getValue('group');
        $scope.call.create      = create;
        $scope.call.setCmd      = setCmd;
        $scope.call.setGroup    = setGroup;

        $scope.model.default    = {"curGroup":'existing', "curMachine":"/c", "curOptions":["/e"]};
        $scope.model.GroupName  = agent;
        $scope.model.AgentType  = [{"id":-1, "label":"Automatic"}, {"id":0, "label":"Windows"}, {"id":4, "label":"Macintosh"}, {"id":5, "label":"Linux"}];
        $scope.model.Machine    = [{"id":"", "name":"Prompt User"}, {"id":"/c", "name":"Computer Name"}, {"id":"/u", "name":"User Name"}, {"id":"/m=machineGroup", "name":"Fixed Name (todo)"}];
        $scope.model.Options    = [
            {"id":"/e", "name":"Exit if agent already installed"},
            {"id":"/b", "name":"Reboot after installation"},
            {"id":"/i", "name":"Ignore non-critical errors"},
            {"id":"/j", "name":"No installation shortcut"},
            {"id":"/p", "name":"Install path (todo)"},
            {"id":"/s", "name":"Silent mode"},
            {"id":"/x", "name":"Disable remote control"}
        ];
        $scope.model.Group      = [{"id":"existing", "name":"Existing"}, {"id":"/n=1 /d", "name":"By domain"}, {"id":"new", "name":"New Group"}, {"id":"prompt", "name":"Prompt User (todo)"}];
        $scope.item             = {"GroupName": agent, "CommandLineSwitches": "/g="+agent+" /c /e", "AgentType": -1, "DefaultAccount":0};
    }

    function create()
    {
        Api.post($scope.item, responseCall);
        function responseCall(response)
        {
            $ionicPopup.alert({
                "title": response.CreateAgentInstallPackageResult.Method,
                "template": "You will be redirected to the list of agent"
            }).then(function(){
                $state.go('main.agent.list');
            })
        }
    }

    function setCmd(value, ref)
    {
        let index = $scope.item.CommandLineSwitches.indexOf(value);
        if(ref==='machine')
        {
            ["\/c","\/u","\/m=([a-zA-Z0-9\_\-]*)"].map(function(item, index){
                let reg = new RegExp(' ?'+item, 'g');
                $scope.item.CommandLineSwitches = $scope.item.CommandLineSwitches.replace(reg, "");
            });
            $scope.item.CommandLineSwitches+= " "+value;
        } else if(ref==='group'){
            ["\/n=1 \/d","\/g=([a-zA-Z0-9\_\-]*)"].map(function(item, index){
                let reg = new RegExp(' ?'+item, 'g');
                $scope.item.CommandLineSwitches = $scope.item.CommandLineSwitches.replace(reg, "");
            });
            if(value==='existing' || value==='new')$scope.item.CommandLineSwitches+= " /g="+$scope.item.GroupName;
            else if(value!=='prompt') $scope.item.CommandLineSwitches+= " "+value;
        } else if(index!==-1){
            let reg = new RegExp(' ?\\'+value);
            $scope.item.CommandLineSwitches = $scope.item.CommandLineSwitches.replace(reg, "");
        } else {
            $scope.item.CommandLineSwitches+= " "+value;
        }
    }

    function setGroup(value)
    {

    }
}

agentListCtrl.$inject = ['myValue', 'resource', '$scope', 'ScopeInit', '$stateParams'];
function agentListCtrl(myValue, resource, $scope, ScopeInit, $stateParams)
{
    var Api  = resource.init('soap/agent/:group');
    ScopeInit.init($scope,alpha);

    function alpha($scope)
    {
        $scope.call.url = url;
        Api.get({"group":$stateParams.group},agentList);
        myValue.setValue('group', $stateParams.group);
    }

    function agentList(response)
    {
        $scope.items = response.GetPackageURLsResult.Packages.Package;
        $scope.model.total = $scope.items.length;
    }

    function url(link)
    {
        if(issets(window,'plugins.socialsharing.share'))
        {
            window.plugins.socialsharing.share("Share Agent installation","Agent installation",null,link);
        } else {
            window.open(link,'_blank', 'location=yes');
        }
    }
}


/*
 /b - Reboot the system after installation completes.
 /c - Use the computer name as the machine ID for the new account.
 /d - Use the current domain name as the group ID for the new account.
 /e - Exit immediately if the installer detects that an agent is already installed.
 /f "Publisher" - Specifies the full name of the service provider or tenant. Windows only.
 /g=xxx - Specifies the group ID to use for the new account.
 /i - Ignore non-critical errors such as incorrect or indeterminate versions of WinSock2, or indeterminate versions of the OS, and force the installation to proceed.
 /j - Does not install an agent shortcut to the Start > All Programs menu
 /k - Displays a dialog box asking the user if it is OK to re-install when the agent is already detected on the machine.
 /m=xxx - Specifies the machine ID to use for the new account.
 /o "Company Title" - Specifies the company title of the service provider or tenant.
 /p "install_path" - Overrides the default installation path
 /r - Executes the installation program and re-installs the agent even if an agent is already on the machine.
 /s - Runs in silent mode. Suppresses all dialog boxes.
 /u - Uses the current machine user name as the machine ID for the new account
 /v - Associates this agent with an existing agent account in the VSA when the machine name
 /w - Overwrites the existing configuration file with a configuration file included in the agent installation.
 /x - Disables remote control after successfully installing the agent.
 /z “Message” - Specifies the message shown to the user when installation completes.
 */