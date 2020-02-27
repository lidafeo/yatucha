$(document).ready(function() {
    $("body").on('click', '.like', function (e) {
        let img = $(this);
        let parentDiv = img.parent();
        let spanCount = parentDiv.children(".count-like");
        let countLike = 0;
        if(spanCount) {
            countLike = +spanCount.text();
        }
        $.post('/like', {"postId" : img.data("id")}, function (data) {
            if(data.result == 'success') {
                return parentDiv.html('<img class="dislike mr-1" src="/images/icons/heart-fill.svg" ' +
                    'alt="" width="30" height="30"><span class="count-like">' + (countLike + 1) + '</span>');
            }
            $("#loginModal").modal('show');
            //window.location.replace('/cabinet');
        });
    });
});