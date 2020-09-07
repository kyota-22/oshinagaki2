$(function(){
  // wineの値は変数data(doneないの記述から引数として渡されてる)
  function buildHTML(wine){
    let html =
      `<tr>
        <td>
          ${wine.name}
        <td>
          ${wine.price}
        <td>
          ${wine.color}
        <td>
          ${wine.area}
        <td>
          ${wine.variety}
        <td>
          ${wine.comment}
        </td>
      </tr>`
    return html;
  };
  $('.wine_form').on('submit', function(e){
    // 同期通信で送信されないように止める
    e.preventDefault()
    // フォームの中身を代入
    let formData = new FormData(this);
    // 非同期でデータを送る宣言
    $.ajax({
      url: '/wines',
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // create.json.jbuilderから正しい値が帰ってきたらdoneを実行
    .done(function(data){
      // buildHTMLメソッドに引数として変数dataを渡し、buildHTMLメソッドの返り値を変数htmlに代入
      let html = buildHTML(data);
      // appendメソッドでwine_listの一番下にhtmlを差し込ませる
      $('.wine_list').append(html);
      // フォームを空にする記述
      $('form')[0].reset();
      alert("ワインを追加しました");
      $('.wine_btn').prop('disabled',false);
    })
    .fail(function() {
      alert("ワインの追加に失敗しました");
    });
  });
});