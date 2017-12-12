import nodesTpl from './nodes.template.directive.html';
import treeviewTpl from './treeview.template.directive.html';
import angular from 'angular';

export default function nodes(compile, http) {

    function expandNode(scope, children, target){
        if(children === undefined && target.tagName === 'BUTTON'){
            return true;
        }
        return false;
    }

    function collapseNode(scope, children, target){
        if(children !== undefined && target.tagName === 'BUTTON'){
            return true;
        }
        return false;
    }

    let directive = {
        restrict: "E",
        replace: true,
        template: nodesTpl,

        link: function(scope, element, attrs){
            scope.button = 'mdi-chevron-right';
            element.on('click', function(event){
                let target = event.target;
                let id = scope.node.id;
                let children = element[0].getElementsByTagName("UL")[0];

                if(collapseNode(scope, children, target)){
                    children.remove();
                    target.classList.remove('mdi-chevron-down')
                    target.classList.add('mdi-chevron-right')
                    compile(element.contents())(scope);
                }

                if(expandNode(scope, children, target)){
                    http.get(scope.url + id)
                    .then((response) => {
                        scope.children = response.data;
                        if(!angular.equals(scope.children, {})){
                            target.classList.remove('mdi-chevron-right')
                            target.classList.add('mdi-chevron-down')
                        } else {
                            target.disabled = true;
                        }
                        element.append(treeviewTpl);
                        compile(element.contents())(scope);
                    });
                }
                event.stopPropagation();
            });
        }
    };

    return directive;
}

nodes.$inject = ['$compile', '$http'];