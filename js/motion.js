// スクロール禁止
function no_scroll() {
  // PCでのスクロール禁止
  document.addEventListener("mousewheel", scroll_control, { passive: false });
  // スマホでのタッチ操作でのスクロール禁止
  document.addEventListener("touchmove", scroll_control, { passive: false });
}
// スクロール禁止解除
function return_scroll() {
  // PCでのスクロール禁止解除
  document.removeEventListener("mousewheel", scroll_control, { passive: false });
  // スマホでのタッチ操作でのスクロール禁止解除
  document.removeEventListener('touchmove', scroll_control, { passive: false });
}
// スクロール関連メソッド
function scroll_control(event) {
  event.preventDefault();
}


$(document).ready(function() {

  //ヘッダーからの全画面モジュール
  let isOpen = false;

  $('#setting-btn').click(function() {
    if (isOpen) {
      $('.from-top-screen').hide();
      //既に開いてたら一度全て閉じる
      $('#setting-screen').show();
      return;
    } 

    isOpen = true;
    $('#setting-screen').slideToggle(200);
    no_scroll();
  });

  $('#usage-btn').click(function() {
    if (isOpen) {
      $('.from-top-screen').hide();
      $('#usage-screen').show();
      return;
    }
    isOpen = true;
    $('#usage-screen').slideToggle(200);
    no_scroll();
  });

  $('.close-btn').click(function() {
    $('.from-top-screen').slideUp(200);
    return_scroll();
    isOpen = false;
  });
  //ヘッダーモジュール終了

  // ゲーム開始時
  $('#gamefield').click(function() {
    // $('body').css('height', '100px');
    //これだとだめ！
    $('#show-result-btn').hide();
    
    $('body').css('pointer-events', 'none');
    $('.header-right li').css('opacity', 0.4);
  });

  //スコア画面
  $('#close-result-btn').click(function() {
    $('#result-screen').animate({opacity : 0}, 500, function(){
      $(this).css('display', 'none');
    });
    $('#show-result-btn').show();
  });

  $('#show-result-btn').click(function() {
    $('#result-screen').animate({opacity : 1}, 500, function(){
      $(this).css('display', 'block');
    });
  });


});