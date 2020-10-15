$(function () {
  getUserInfo();
  var layer = layui.layer;
  // 绑定点击事件
  $("#btnLogout").on("click", function () {
    // 点击事件触发弹出确认框
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (
      // 回调里面执行
      index
    ) {
      // 清除token
      localStorage.removeItem("token");

      // 跳转页面
      location.href = "./login.html";
      // 关闭弹出框
      layer.close(index);
    });
  });
});

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: { Authorzation: localStorage.getItem("token") || "" },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        layui.layer.msg(res.message || "获取用户信息失败");
        return;
      }
      renderAvatar(res.data);
    },
  });
}
function renderAvatar(user) {
  var name = user.nicknmae || user.username;

  $("#welcome").html("欢迎&nbsp;&nbsp" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
