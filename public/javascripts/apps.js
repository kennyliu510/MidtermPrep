

angular.module('bestMusic', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http){
    $scope.test = 'Hello world!';
    $scope.musics = [
      {title: 'Song 1', album: 'Album 1', artist: 'Artist 1', genre: 'Genre 1', coverUrl: 'Url 1', upvotes: 5},
      {title: 'Song 2', album: 'Album 2', artist: 'Artist 2', genre: 'Genre 2', coverUrl: 'Url 2', upvotes: 4},
      {title: 'Song 3', album: 'Album 3', artist: 'Artist 3', genre: 'Genre 3', coverUrl: 'Url 3', upvotes: 3},
      {title: 'Song 4', album: 'Album 4', artist: 'Artist 4', genre: 'Genre 4', coverUrl: 'Url 4', upvotes: 2},
      {title: 'Song 5', album: 'Album 5', artist: 'Artist 5', genre: 'Genre 5', coverUrl: 'Url 5', upvotes: 1}
    ];

    $scope.create = function(music) {
      return $http.post('/musics', music).success(function(data){
        $scope.musics.push(data);
      });
    };

    $scope.addMusic = function() {
      if($scope.title === '' ||   $scope.album ==='' || $scope.artist==='' || $scope.genre==='' || $scope.coverUrl==='') {return;}
      $scope.create({title: $scope.title, album: $scope.album, artist:$scope.artist, genre: $scope.genre, coverUrl: $scope.coverUrl, upvotes: 0});
      $scope.title='';
      $scope.album='';
      $scope.artist='';
      $scope.genre='';
      $scope.coverUrl='';
    };

    $scope.upvote = function(music) {
      return $http.put('/musics/' + music._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          music.upvotes += 1;
        });
    };

    $scope.incrementUpvotes = function(music) {
       $scope.upvote(music);
    };

    $scope.getAll = function() {
      return $http.get('/musics').success(function(data){
        angular.copy(data, $scope.musics);
      });
    };
    $scope.getAll();
  }
]);



