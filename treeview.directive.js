export default () => {
    let directive = {
        restrict: "E",
        replace: true,
        scope: {
            nodes: '=',
            selectedObject: '&',
            url: '=apiUrl'
        },
        template: "<ul><nodes ng-repeat='node in nodes' node='node'></nodes></ul>"
    };
    return directive;
};
