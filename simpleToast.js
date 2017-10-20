/*
	simpleToast - main js
*/
var simpleToast = function() {

	var _close = function() {
		var $this = $(this);
		$this.closest('.simpleToast-item').fadeOut();
		setTimeout(function(){$this.closest('.simpleToast-item').remove()}, 500);
	}		

	var _coreB = function(type, msg) {
		var core = `
			<div class="simpleToast-itemsimpleToast-${type}">
				<span class="simpleToast-item-span">${msg}</span>
				<i class="simpleToast-item-icon fa fa-close"></i>
			</div>`

		return core;
	}

	var _clearStackB = function(container, action) {
		if(action) {
			container.children().remove();
		}
	}

	var _makeParent = function(mglobal) {

		var containerparent;

		if(mglobal) {
			var containerglobal;
			if(!$(".simpleToast-global").length) {
				containerglobal = `
					<div class="simpleToast-global"></div>
				`;
				$('body').append(containerglobal);
			}
			
			containerparent = $(".simpleToast-global");
		} else {
			containerparent = $('.simpleToast-container');
		}
		
		return containerparent;
	}

	var newToast = function(type, msg, mglobal=false, clearStack=false) {
		
		var core 	= _coreB(type, msg);
		var parent 	= _makeParent(mglobal);

		_clearStackB(parent, clearStack);
		parent.append(core);

		$('.simpleToast-item').fadeIn();
		$('.simpleToast-item').on('click', close);

	}		

	var clear = function() {
		$('.simpleToast-item').fadeOut();
		setTimeout(function(){$('.simpleToast-item').remove()}, 500);
	}

	return {
		newsimpleToast 	: newsimpleToast,
		clear 		: clear,
	}
}()