angular.module('adherentsModule')
    .controller('AdherentsController', function($scope, $window, adherentsService, DTOptionsBuilder /*, DTColumnDefBuilder*/ , $rootScope) {

        $rootScope.pageActive = 'adherents';

            $scope.adherent = [];
            $scope.adherents = [];
            adherentsService.getAdherents().then(function(param) {
                $scope.adherents = param;
            });

            $scope.calculAge = function() {
                var dateNaiss = $scope.adherent.date_naissance;
                if (dateNaiss !== undefined) {
                    dateNaiss = dateNaiss.split("/");


                    var dateNaissFormat = new Date(dateNaiss[1] + ' ' + dateNaiss[0] + ' ' + dateNaiss[2]);

                    var ageDifMs = Date.now() - dateNaissFormat.getTime();
                    var ageDate = new Date(ageDifMs);
                    var ageFinal = Math.abs(ageDate.getUTCFullYear() - 1970);
                    $scope.adherent.age = ageFinal;


                }
            }


            //ajoute une option de 'rowCallback'
            $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('rowCallback', rowCallback);

            //permet d'acceder à la fiche de la ligne correspondante
            function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
                $('td', nRow).unbind('click');
                $('td', nRow).bind('click', function() {
                    $scope.$apply(function() {
                        $window.location.href = '#/ficheAdherent/' + aData[0];
                    });
                });
                return nRow;
            }



            $scope.finCotisation = function() {
                var dateDeb = $scope.adherent.datePaiementCotisation
                if (dateDeb !== undefined) {
                    dateDeb = dateDeb.split("/");
                    var dateDebFormat = new Date(dateDeb[1] + ' ' + dateDeb[0] + ' ' + dateDeb[2]);
                    var dateFinAbonnement = new Date(dateDebFormat.setFullYear(dateDebFormat.getFullYear() + 1));
                    $scope.adherent.dateFinAbonnement = dateFinAbonnement.toLocaleDateString();

                }


            }


    });
