$(document).on('click', "#delete_blog", function(){
  var blogId = $(this).data('blog-id');
  var csrf = $("[name='_csrf']").val();
  $.ajax({
    type: 'post',
    url: "/blogs/" + blogId + "/delete",
    data: {_csrf: csrf}
  }).done(function(){
    window.location = "/blogs";
  });
});
