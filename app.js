$(document).ready(function(){
  $(".authenticate").click(function(){
    SC.initialize({
      client_id: '408b159e2a4fcbec5a4a68226a8820a9',
      redirect_uri: 'http://127.0.0.1:8000/callback.html'
    });

    SC.connect().then(function(){
      alert("Authentication successfull");
    });
  });


  $(".tracks").click(function(){
    SC.get('me/tracks').then(function(res){
      var html1 ="";
      for(var i=0; i<res.length; i++)
      {
        html1+= "<li> <a href="+res[i].permalink_url +">"+res[i].title+"</li>"

      }
      $("#trackss").html(html1);
    });
  });

  $(document).on('click','#trackss li a',function(e){
    e.preventDefault();
    var uri= $(this).attr('href');
    console.log(uri);
    SC.oEmbed(uri, {auto_play: false, iframe: false}).then(function(a) {
      $('#target').html(a.html)
    });
  });



  $(".upload").click(function(){
    var fileInput = document.getElementById('fileInput');
    var file= fileInput.files[0];
    var title= $("#title").val();
    console.log(typeof (file));

    var upload = SC.upload({
      file: file,
      title: title
    });

    upload.then(function(track){
      $(trackss).append("<li> <a href="+track.permalink_url +">"+track.title+"</li>")
      alert('Upload is done! Check your sound at ' + track.permalink_url);
    });
  })

})
