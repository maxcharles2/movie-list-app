var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down")
var trash = document.getElementsByClassName("fa-trash-o");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const movieItem = this.closest('.movieItem');
        const userNameVal = movieItem.querySelector('.userName').innerText;
        const movieNameVal = movieItem.querySelector('.movieName').innerText;
        const movieDirectorVal = movieItem.querySelector('.movieDirector').innerText;
        const yearCreatedVal = movieItem.querySelector('.yearCreated').innerText;
        const movieLengthVal = movieItem.querySelector('.movieLength').innerText;
        const watchedMovieVal = movieItem.querySelector('.watchedMovie').innerText;
        const movieReviewVal = movieItem.querySelector('.movieReview').innerText;
        const thumbUpText = movieItem.querySelector('.thumbUp').innerText;
        const thumbUpVal = parseFloat(thumbUpText.replace('Total upvotes: ', '').trim());
        const movieId = movieItem.getAttribute('data-id'); //stores id in data attribute
        fetch('upVote', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            '_id': movieId, //id value part of request object getting sent server side
            'userName': userNameVal,
            'movieName': movieNameVal,
            'movieDirector': movieDirectorVal,
            'yearCreated': yearCreatedVal,
            'movieLength': movieLengthVal,
            'watchedMovie': watchedMovieVal,
            'movieReview': movieReviewVal,
            'thumbUp': thumbUpVal
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const movieItem = this.closest('.movieItem');
    const userNameVal = movieItem.querySelector('.userName').innerText;
    const movieNameVal = movieItem.querySelector('.movieName').innerText;
    const movieDirectorVal = movieItem.querySelector('.movieDirector').innerText;
    const yearCreatedVal = movieItem.querySelector('.yearCreated').innerText;
    const movieLengthVal = movieItem.querySelector('.movieLength').innerText;
    const watchedMovieVal = movieItem.querySelector('.watchedMovie').innerText;
    const movieReviewVal = movieItem.querySelector('.movieReview').innerText;
    const thumbUpText = movieItem.querySelector('.thumbUp').innerText;
    const thumbUpVal = parseFloat(thumbUpText.replace('Total upvotes: ', '').trim());
    const movieId = movieItem.getAttribute('data-id'); //stores id in data attribute
    fetch('downVote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': movieId, //id value part of request object getting sent server side
        'userName': userNameVal,
        'movieName': movieNameVal,
        'movieDirector': movieDirectorVal,
        'yearCreated': yearCreatedVal,
        'movieLength': movieLengthVal,
        'watchedMovie': watchedMovieVal,
        'movieReview': movieReviewVal,
        'thumbUp': thumbUpVal
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const movieItem = this.closest('.movieItem');
        const userNameVal = movieItem.querySelector('.userName').innerText;
        const movieNameVal = movieItem.querySelector('.movieName').innerText;
        const movieDirectorVal = movieItem.querySelector('.movieDirector').innerText;
        const yearCreatedVal = movieItem.querySelector('.yearCreated').innerText;
        const movieLengthVal = movieItem.querySelector('.movieLength').innerText;
        const watchedMovieVal = movieItem.querySelector('.watchedMovie').innerText;
        const movieReviewVal = movieItem.querySelector('.movieReview').innerText;
        const thumbUpText = movieItem.querySelector('.thumbUp').innerText;
        const thumbUpVal = parseFloat(thumbUpText.replace('Total upvotes: ', '').trim());
        const movieId = movieItem.getAttribute('data-id'); //stores id in data attribute
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            '_id': movieId, //id value part of request object getting sent server side
            'userName': userNameVal,
            'movieName': movieNameVal,
            'movieDirector': movieDirectorVal,
            'yearCreated': yearCreatedVal,
            'movieLength': movieLengthVal,
            'watchedMovie': watchedMovieVal,
            'movieReview': movieReviewVal,
            'thumbUp': thumbUpVal
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
