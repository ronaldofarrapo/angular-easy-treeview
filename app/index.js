import nodesDirective from './nodes.directive';
import treeviewDirective from './treeview.directive';
import angular from 'angular';

export default angular.module('app.treeview', [])
    .directive('nodes', nodesDirective)
    .directive('easyTreeview', treeviewDirective)
    .name;
