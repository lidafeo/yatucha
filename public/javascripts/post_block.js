$(document).ready(function() {

    let currPage = 1;
    $("body").on('click', '#but-more', function (e) {
        e.preventDefault();
        $(this).attr('disabled', true);
        let url = document.location.pathname;
        $.post('/get-more', {"url" : url, "page": currPage}, function (data) {
            $('#but-more').attr('disabled', false);
            if(data.error) {
                return console.log(data.error);
            }
            if(+data.count === 0) {
                return $('#but-more').remove();
            }
            $("#all-posts").append(data);
            currPage ++;
        });
    });

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