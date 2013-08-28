'use strict';

angular.module('spmon.controllers', [])
  .controller('DetectorSummaryCtrl',
              ['$scope', '$state', '$stateParams', 'alarmLevels', 'naturalLog',
              function($scope, $state, $stateParams, alarmLevels, naturalLog) {
    $scope.crates = [];

    $scope.getAlarmLevel = function() {
      return alarmLevels.getLevel('cmos');  // fixme not just cmos
    };
    $scope.setAlarmLevel = function(level) {
      return alarmLevels.setLevel('cmos', level);
    };

    $scope.dataSource = $state.current.data.dataSource;
    $scope.title = $state.current.data.title;
    $scope.crateId = $stateParams.crateId;
    $scope.transitionTo = $state.transitionTo;
    console.log($state)

    for (var crate_id=0; crate_id<19; crate_id++) {
      var crate_id_s = '';
      if (crate_id < 10) {
        crate_id_s = '0' + String(crate_id);
      }
      else {
        crate_id_s = String(crate_id);
      }
      $scope.crates.push({
        id: crate_id,
        id_string: crate_id_s
      });

      naturalLog.get_data('crate' + $scope.crates[crate_id].id_string + '.' + $scope.dataSource).then(
        (function(crate_id) {
          return function(data) {
            var max_rate = 0;
            var max_card = 'none';
            var max_channel = 'none';

            if (data.values && data.values[0]) {
              $scope.crates[crate_id]['rates'] = data.values[0];
              for (var card_id=0; card_id<16; card_id++) {
                for (var channel_id=0; channel_id<32; channel_id++) {
                  var rate = data.values[0][card_id][channel_id];
                  if (rate > max_rate) {
                    max_rate = rate;
                    max_card = card_id;
                    max_channel = channel_id;
                  }
                }
              }
            }
            $scope.crates[crate_id]['max_rate'] = max_rate;
            $scope.crates[crate_id]['max_card'] = max_card;
            $scope.crates[crate_id]['max_channel'] = max_channel;
            $scope.crates[crate_id]['alarm'] = (max_rate > $scope.alarmLevel);
          };
        })(crate_id)
      );
    }
  }]);

