/// <reference path="DataUtil.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
class PersonaListController {
  $scope;
  constructor($scope) {
    this.$scope = $scope;
    $scope.fullPersonaList = fullPersonaList;

    // set the default sort param
    $scope.sortBy = 'level';
    $scope.sortReverse = false;
    $scope.sortFunc = this.getSortValue.bind(this);
  }

  private getSortValue(item) {
    const sortBy = this.$scope.sortBy;
    if (sortBy === 'arcana') {
      const arcanaIndex = Object.keys(rareCombos).indexOf(item.arcana);
      const arcanaValue = arcanaIndex >= 10 ? arcanaIndex.toString() : `0${arcanaIndex}`;

      const level = 100 - item.level;
      const levelValue = level >= 10 ? level.toString() : (`0${level}`);

      return arcanaValue + levelValue;
    }
    else {
      return item[sortBy];
    }
  }
}
