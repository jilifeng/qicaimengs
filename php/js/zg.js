
//前端交互，跳转
function test(){

//点击效果
$(".mytouch").on("touchstart",function(){
	$(this).addClass("myop");
})
$(".mytouch").on("touchend",function(){
	$(this).removeClass("myop");
})
//清除名称输入框
$("#name-guanbi").click(function(){
		$("#cname").val("");
	})
//选择性别
$("#megenger").click(function(e){
		
		var buttons = [
			{
				text:"男",
				onClick:function(){
					$("#megenger").val("男");
				}
			},
			{
				text:"女",
				onClick:function(){
					$("#megenger").val("女");
				}
			}
		]
		$.actions(buttons);
})
//选择日期
//$("#brdate").calendar();
//$("#brdate").click(function(){
//	$(".zhezhao").fadeIn();
//	$(".zhezhao").click(function(){
//		$(".zhezhao").fadeOut();
//	});
//	$("#brdate").change(function(){
//		$(".zhezhao").fadeOut();
//	})
//})


//编辑信息未保存返回
$("#meback").click(function(){
		$.confirm('您还未保存已修改的信息，确定现在要返回吗？',
		function(){
			history.back();
		},
		function(){
			
		}
		)
		
})
//头像弹出	



	
	/*
	 //注册协议验证
	 $("#select").click(function(){
		$("#select i").toggle();
		if($("#select").attr('selected')=="selected"){
			$("#mr-wc").addClass("bg-gray");
			$("#select").attr('selected',false);
		}else{
			$("#mr-wc").removeClass("bg-gray");
			$("#select").attr('selected','selected');
		}
		
	});*/
	//至尊页面跳转
		$("#zhizun").click(function(){
		window.location.href="http://v.7cai.tv/a/zhizunduxiang.html";
	})
	//注册跳转
	$("#user-re").click(function(){
			window.location.href="mobileRegist.html"
	})
	//找回密码跳转
	$("#forget-ps").click(function(){
			window.location.href="backpsword.html"
	})
	//更改手机号跳转
	$("#changemobile").click(function(){
			window.location.href="./ModifyMobile.html"
	})
	//编辑资料跳转	
	$("#p-message").click(function(){
			window.location.href="./personMessage/editmessage.html"
	})
	$("#hy-edit").click(function(){
			window.location.href="./personMessage/editmessage.html"
	})
	//更改名称跳转
	$("#c-username").click(function(){
			window.location.href="./changename.html"
	})
	//实名跳转
	$("#smrz").click(function(){
			window.location.href="./IdOccupied.html"
	})
	//安全密码跳转
	$("#c-secpsword").click(function(){
			window.location.href="./ModifySecPassword.html"
	})
	//登录密码跳转
	$("#c-lgpsword").click(function(){
			window.location.href="./ModifyPassword.html"
	})
	//推荐页跳转
	$("#tuijian-page").click(function(){
			window.location.href="./tuiJian/tuijianYouli.html"
	})
	//好友页
	$("#haoyou-page").click(function(){
			window.location.href="./nofriend.html"
	})
	//卡卷页
	$("#kajuan-page").click(function(){
			window.location.href="./wodekajuan/wodekajuan.html"
	})
	//在线电影卷
	$("#zxyhj-page").click(function(){
			window.location.href="zxyhj.html"
	})
	//门店卡卷
	$("#mendianyouhuiquan").click(function(){
			window.location.href="zxyhj.html"
	})
	//播放记录
	$("#bfjl-page").click(function(){
			window.location.href="./bofangJilu/bfjl-qs.html"
	})
	//信息中心
	$("#xxzx-page").click(function(){
			window.location.href="./xiaoxizhongxin/xiaoxizhongxin.html"
	})
	//系统消息
	$("#xitxx-page").click(function(){
			window.location.href="noxiaoxi.html"
	})
	//评论赞
	$("#pinglz-page").click(function(){
			window.location.href="noxiaoxi.html"
	})
	//我的电影票
	$("#wddyp-page").click(function(){
			window.location.href="./wodedianyingpiao/wddianyingpiao.html"
	})
	//影片分享按钮
	/*$("#button-fenxiang").click(function(){	
		$("#vp-fenxiang").fadeIn();
	})
	//分享关闭按钮
	$("#fenxiang-close").click(function(){
		$("#vp-fenxiang").fadeOut();
	})*/
	//删除地址按钮
	$("#deadd").click(function(){
		$.confirm('您确定要删除该地址吗？',
		function(){
			
		},
		function(){
			
		}
		)
		
	})
	//兑换商品按钮
	$(".lijiduihuan").click(function(){
		$.confirm('确定兑换此商品？',
		function(){
			$.toast("积分不足，无法兑换");
		},
		function(){
			
		}
	)		
	})
	$("#aa").click(function(){
			window.location.href="./AddAddress.html"
	})
	//编辑地址
	$(".edit-ad").click(function(){
			window.location.href="./editaddress.html"
	})	
	//会员页面
	$("#huiyuan-page").click(function(){
			window.location.href="./huiyuan/kaiHuiyuan.html"
	})
	$("#hytq").click(function(){
			window.location.href="./huiyuan/kaiHuiyuan.html"
	})
	//意见反馈
	$("#yjfk-page").click(function(){
			window.location.href="./yijianfankui/yijianfankui.html"
	})
	//设置
	$("#shezhi-page").click(function(){
			window.location.href="./shezhi/shezhi.html"
	})
	//视频收藏
	$("#spsc-page").click(function(){
			window.location.href="./shipinshoucang/ScVideoLack.html"
	})
	//开通会员页返回
	$("#huiyuan-back").click(function(){
			window.location.href="../gerenzhongxin/personmessage.html"
	})
	//我的积分
	$("#wdjf-page").click(function(){
			window.location.href="./wodejifen/MyPoints.html"
	});
	//我的订单
	$("#dingdan-page").click(function(){
			window.location.href="./wodedingdan/wodedingdan.html"
	});
	//首页
	$("#nav-shouye").click(function(){
		$("#nav-shouye span:nth-child(1)").addClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").addClass("icon-shangcheng1");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/"
	});
	//商城
	$("#nav-shangcheng").click(function(){
		$("#nav-shangcheng span:nth-child(1)").addClass("icon-shangcheng-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/templets/shangcheng/shangcheng.html"
	});
	//购票
	$("#nav-goupiao").click(function(){
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");	
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/templets/goupiao/goupiao.html"
	});
	//发现
	$("#nav-faxian").click(function(){
		$("#nav-faxian span:nth-child(1)").addClass("icon-faxian-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode-tianchong");
		window.location.href="/templets/faxian/faxian.html"
	});
	//我的样式
	$("#nav-wode").click(function(){
		$("#nav-wode span:nth-child(1)").removeClass("icon-wode1");
		$("#nav-wode span:nth-child(1)").addClass("icon-wode-tianchong");
		$("#nav-shouye span:nth-child(1)").removeClass("icon-shouye-tianchong");
		$("#nav-shangcheng span:nth-child(1)").removeClass("icon-shangcheng-tianchong");
		$("#nav-goupiao span:nth-child(1)").addClass("icon-goupiao1");
		$("#nav-goupiao span:nth-child(1)").removeClass("icon-goupiao-tianchong");
		$("#nav-faxian span:nth-child(1)").removeClass("icon-faxian-tianchong");	
	});
	//首页消息
	$("#syxiaoxi-page").click(function(){
			window.location.href="/templets/gerenzhongxin/xiaoxizhongxin/xiaoxizhongxin.html"
	});
	//首页记录
	$("#syjilu-page").click(function(){
			window.location.href="/templets/gerenzhongxin/bofangjilu/bfjl-qs.html"
	});
	//条款跳转
	$(".tiaokuan-tiaozhuan").click(function(){
			window.location.href="./agreement.html";
	})
	//选择框
	$(".label-switch").click(function(){
		if($(this).children("input").attr("checked") == "checked"){
			$(this).children("input").attr("checked",false);
			$(this).children("div").removeClass("bg-ff8");
			$(this).children("div").addClass("bg-f5");
		}else{
			$(this).children("input").attr("checked",true);
			$(this).children("div").removeClass("bg-f5");
			$(this).children("div").addClass("bg-ff8");
		}
	});
	//选择地区
	$("#ad-ad-arpicker").click(function(e){	
		e.preventDefault();
		$("#ad-ad-arpicker").cityPicker({
		toolbarTemplate: '<header class="bar bar-nav">\
						    <button class="button button-link pull-right close-picker">确定</button>\
						    <h1 class="title">选择地区</h1>\
						    </header>'
		})
	});
	//选择地区-编辑地址
	$("#chosearea").click(function(e){
		e.preventDefault();
		$("#chosearea").cityPicker({
		toolbarTemplate: '<header class="bar bar-nav">\
						    <button class="button button-link pull-right close-picker">确定</button>\
						    <h1 class="title">选择地区</h1>\
						    </header>'
		});
	})
	//圆圈勾选
//	$(".my-select").click(function(){
//		$(this).toggleClass("bg-myse");
//		$(this).attr("checked",!$(this).attr("checked"));
//		console.log($(this).attr("checked"));
//	})
	//文本展开
	$(".tk-open").click(function(){
		$(this).toggleClass("icon-up");
		$(this).toggleClass("icon-down");
		$(this).parent().siblings().toggleClass("danhang");
	})
	//反馈问题选择
	$("#fk-fklx").picker({
		toolbarTemplate: '<header class="bar bar-nav border-no">\
		  <button class="button button-link pull-left no-border"><span class="color-gray"></span></button>\
		  <button class="button button-link pull-right close-picker color-f60"><span class="color-f60">确定</span></button>\
		  </header>',
		  cols: [
		    {
		      textAlign: 'center',
		      values: ['内容问题', '播放问题', '卡顿问题', '会员问题', '账号问题', '闪退、页面加载问题', '产品意见']
		    }
		  ]
	});	
	//退款原因选择
	$("#tuikuanyuanyin").picker({
		toolbarTemplate: '<header class="bar bar-nav border-no">\
		  <button class="button button-link pull-left no-border"><span class="color-gray"></span></button>\
		  <button class="button button-link pull-right close-picker color-f60"><span class="color-f60">确定</span></button>\
		  </header>',
		  cols: [
		    {
		      textAlign: 'center',
		      values: ['内容问题', '播放问题', '卡顿问题', '会员问题', '账号问题', '闪退、页面加载问题', '产品意见']
		    }
		  ]
	});

	//退票按钮
	$(".mybutton-2").click(function(){
		$.confirm('确定要放弃观看电影吗？',
		function(){
			window.location.href="wddyp-tp.html"
		},
		function(){
			
		}
		)
	});
	//分页点击效果
	$(".list-module").mousedown(function(){
		$(this).addClass("mouselight");
	});
	$(".list-module").mouseup(function(){
		$(this).removeClass("mouselight");
	});

//清空搜索记录
$("#qingkongjilu").click(function(){
	$(".sousuo-list ul li").remove();
})
//影片分享按钮
$("#button-fenxiang").click(function(){
	$("#vp-fenxiang").fadeIn();
})
//分享关闭按钮
$("#fenxiang-close").click(function(){
	$("#vp-fenxiang").fadeOut();
})
//搜索返回
$("#sousuo-quxiao").click(function(){
	console.log("1");
	window.history.go(-1);
})
//查看更多
$(".chakangengduo").click(function(){
	$.showIndicator();
	window.location.href="http://v.7cai.tv/plus/list.php?tid=8";
})
// JavaScript Document<script>
$(".vpl_Collection").click(function()
{	
	if($(".vpl_Collection").attr('index')=="1")
		{
			$(".vpl_Collection").removeClass("icon-weishoucang");
			$(".vpl_Collection").addClass("icon-yishoucang");
			$(".vpl_Collection").css("color","#ff8c24");
			$(".vpl_Collection").attr("index","2");
			$.toast("收藏成功");
		}
		else
		{
			$(".vpl_Collection").removeClass("icon-yishoucang");
			$(".vpl_Collection").addClass("icon-weishoucang");
			$(".vpl_Collection").css("color","#383838");
			$(".vpl_Collection").attr("index","1");
			$.toast("取消收藏");
		}		
		});
		$(".vpl_introduction").click(function()
		{	
			$(".vpl_VideoDetail_member").toggle();
			$(".vpl_introduction").toggleClass("icon-up");
			
		});
		$(".vpl_slidemore_go").click(function(){
					$(".vpl_box_remonforyou").show();
					$(".vpl_middleline").hide();
					$(".vpl_VideoDetail").hide();
					$(".vpl_remonForyou").hide();
					$(".vpl_remonForyou_list").hide();
					$(".vpl_coment_section").hide();
					$(".vpl_remonForyou2").show();
					$(".vpl_remonForyou_list2").show();
			})
			$(".vpl_remonForyou_close").click(function(){
					$(".vpl_box_remonforyou").hide();
					$(".vpl_middleline").show();
					$(".vpl_VideoDetail").show();
					$(".vpl_remonForyou").show();
					$(".vpl_remonForyou_list").show();
					$(".vpl_coment_section").show();
					$(".vpl_remonForyou2").hide();
					$(".vpl_remonForyou_list2").hide();
			})
			
			



function noscroll(){
    	var content = document.querySelector('.content');
		var startY;
		
		content.addEventListener('touchstart', function (e) {
		    startY = e.touches[0].clientY;
		});
		
		content.addEventListener('touchmove', function (e) {
		    // 高位表示向上滚动
		    // 底位表示向下滚动
		    // 1容许 0禁止
		    var status = '11';
		    var ele = this;
		
		    var currentY = e.touches[0].clientY;
		
		    if (ele.scrollTop === 0) {
		        // 如果内容小于容器则同时禁止上下滚动
		        status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
		    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
		        // 已经滚到底部了只能向上滚动
		        status = '10';
		    }
		
		    if (status != '11') {
		        // 判断当前的滚动方向
		        var direction = currentY - startY > 0 ? '10' : '01';
		        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
		        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
		            e.preventDefault();
		        }
		    }
		});
    }
noscroll();

}

test();

