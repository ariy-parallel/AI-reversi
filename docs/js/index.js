var Setting,Turn,Board,AI;String.prototype.to_i=function(){return parseInt(this,10)},String.prototype.row_col=function(){var t,e,n,o,r;for(r=[],e=0,n=(o=this.split("")).length;e<n;e++)t=o[e],r.push(t.to_i());return r},Setting=function(){function t(){}return t.DISK={BLACK:"black",WHITE:"white",NONE:""},t.AI={SCORE:{A:0,B:0,C:-5,X:-10,CORNER:20,NONE:0}},t.BOARD={INITIAL:[["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","",t.DISK.WHITE,t.DISK.BLACK,"","",""],["","","",t.DISK.BLACK,t.DISK.WHITE,"","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""]],SCORE:[[t.AI.SCORE.CORNER,t.AI.SCORE.C,t.AI.SCORE.A,t.AI.SCORE.B,t.AI.SCORE.B,t.AI.SCORE.A,t.AI.SCORE.C,t.AI.SCORE.CORNER],[t.AI.SCORE.C,t.AI.SCORE.X,0,0,0,0,t.AI.SCORE.X,t.AI.SCORE.C],[t.AI.SCORE.A,0,0,0,0,0,0,t.AI.SCORE.A],[t.AI.SCORE.B,0,0,0,0,0,0,t.AI.SCORE.B],[t.AI.SCORE.B,0,0,0,0,0,0,t.AI.SCORE.B],[t.AI.SCORE.A,0,0,0,0,0,0,t.AI.SCORE.A],[t.AI.SCORE.C,t.AI.SCORE.X,0,0,0,0,t.AI.SCORE.X,t.AI.SCORE.C],[t.AI.SCORE.CORNER,t.AI.SCORE.C,t.AI.SCORE.A,t.AI.SCORE.B,t.AI.SCORE.B,t.AI.SCORE.A,t.AI.SCORE.C,t.AI.SCORE.CORNER]]},t}(),Turn=function(){function t(){this.this_player=Setting.DISK.BLACK,this.next_player=Setting.DISK.WHITE}return t.prototype.change=function(){var t;return t=[this.next_player,this.this_player],this.this_player=t[0],this.next_player=t[1],t},t}(),Board=function(){function t(){this.cells=Setting.BOARD.INITIAL,this.this_player=Setting.DISK.BLACK,this.next_player=Setting.DISK.WHITE,this.blank_cells=60,this.AI="-",this.you="-"}return t.ADJACENT=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],t.prototype.clone=function(){return jQuery.extend(!0,{},this)},t.prototype.change=function(){var t;return t=[this.next_player,this.this_player],this.this_player=t[0],this.next_player=t[1],t},t.prototype.count_you=function(){var t,e,n,o,r,i,a,s,_;for(e=0,_=n=0,r=(a=this.cells).length;n<r;_=++n)for(t=o=0,i=(s=a[_]).length;o<i;t=++o)s[t]===this.you&&(e+=1);return e},t.prototype.count_AI=function(){var t,e,n,o,r,i,a,s,_;for(e=0,_=n=0,r=(a=this.cells).length;n<r;_=++n)for(t=o=0,i=(s=a[_]).length;o<i;t=++o)s[t]===this.AI&&(e+=1);return e},t.prototype.draw=function(){var t,e,n,o,r,i,a,s,_,l;for(l=o=0,i=(s=this.cells).length;o<i;l=++o)for(n=r=0,a=(_=s[l]).length;r<a;n=++r)e=_[n],t=$("#"+l+n),this.can_move(l,n)?t.addClass("movable"):t.removeClass("movable"),e!==Setting.DISK.NONE&&(t.addClass("disk"),t.removeClass(Setting.DISK.BLACK),t.removeClass(Setting.DISK.WHITE),t.addClass(e));return $(".mini_disk.you").text(this.count_you()),$(".mini_disk.AI").text(this.count_AI())},t.prototype.draw_result=function(){return $(".mini_disk.AI").text().to_i()<$(".mini_disk.you").text().to_i()?$(".your_result").text("YOU WIN!!!"):$(".mini_disk.you").text().to_i()<$(".mini_disk.AI").text().to_i()?$(".your_result").text("YOU LOSE..."):$(".your_result").text("DRAW"),$(".choose_disk").hide(),$(".modal").fadeIn(),$(".result").fadeIn()},t.prototype.movable_cells=function(){var t,e,n,o,r,i,a,s,_;for(i=[],_=e=0,o=(a=this.cells).length;e<o;_=++e)for(t=n=0,r=(s=a[_]).length;n<r;t=++n)s[t],this.can_move(_,t)&&i.push([_,t]);return i},t.prototype.movable_cells_length=function(){return this.movable_cells().length},t.prototype.can_move_anywhere=function(){var t,e,n,o,r,i,a,s;for(s=e=0,o=(i=this.cells).length;e<o;s=++e)for(t=n=0,r=(a=i[s]).length;n<r;t=++n)if(a[t],this.can_move(s,t))return!0;return!1},t.prototype.move=function(t,e){return this.blank_cells-=1,this.flip(t,e),this.change()},t.prototype.can_move=function(e,n){var o,r,i,a,s,_;if(this.cells[e][n]!==Setting.DISK.NONE)return!1;for(o=0,r=(i=t.ADJACENT).length;o<r;o++)if(_=(a=i[o])[0],s=a[1],0<this.flip_disk_each_direction(e,n,_,s).length)return!0;return!1},t.prototype.flip=function(t,e){var n,o,r,i,a,s,_;for(this.cells[t][e]=this.this_player,a=[],n=0,o=(r=this.flip_disk(t,e)).length;n<o;n++)_=(i=r[n])[0],s=i[1],a.push(this.cells[_][s]=this.this_player);return a},t.prototype.flip_disk=function(e,n){var o,r,i,a,s,_,l;for(o=[],r=0,i=(a=t.ADJACENT).length;r<i;r++)l=(s=a[r])[0],_=s[1],o=o.concat(this.flip_disk_each_direction(e,n,l,_));return o},t.prototype.flip_disk_each_direction=function(t,e,n,o){var r,i,a,s,_;for(s=[],a=t,i=e,_=0;_<=8;_++){if(i+=o,!(0<=(a+=n)&&a<=7&&0<=i&&i<=7))return[];if((r=this.cells[a][i])!==this.next_player)return r===this.this_player?s:[];s.push([a,i])}},t}(),AI=function(){function t(t){this.board=t}return t.prototype.search=function(){},t}();var AI1,extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI1=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,AI),e.prototype.search=function(){var t,e,n,o,r,i,a,s,_,l,c;for(e in _=(o=[-1,-1])[0],s=o[1],n=-64,r=this.board.movable_cells())l=(i=r[e])[0],t=i[1],n<(c=this.board.flip_disk(l,t).length)&&(n=c,_=(a=[l,t])[0],s=a[1]);return[_,s]},e}();var AI2;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI2=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,AI),e.prototype.search=function(){var t,e,n,o,r,i,a,s,_,l,c;for(e in _=(o=[-1,-1])[0],s=o[1],n=64,r=this.board.movable_cells())l=(i=r[e])[0],t=i[1],(c=this.board.flip_disk(l,t).length)<n&&(n=c,_=(a=[l,t])[0],s=a[1]);return[_,s]},e}();var AI3;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI3=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,AI),e.prototype.search=function(){var t,e,n,o,r,i,a,s,_,l,c,h;for(e in l=(r=[-1,-1])[0],_=r[1],n=-64,i=this.board.movable_cells())c=(a=i[e])[0],t=a[1],(o=this.board.clone()).flip(c,t),n<(h=this.more_move_count(o))&&(n=h,l=(s=[c,t])[0],_=s[1]);return[l,_]},e.prototype.more_move_count=function(t){var e;return e=t.movable_cells_length(),t.change(),e-t.movable_cells_length()},e}();var AI4;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI4=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,AI3),e.prototype.search=function(){var t,e,n,o,r,i,a,s,_,l,c,h;for(e in l=(r=[-1,-1])[0],_=r[1],n=-64,i=this.board.movable_cells())c=(a=i[e])[0],t=a[1],(o=this.board.clone()).move(c,t),n<(h=this.min_score(o))&&(n=h,l=(s=[c,t])[0],_=s[1]);return[l,_]},e.prototype.min_score=function(t){var e,n,o,r,i,a,s,_;for(n in s=64,r=t.movable_cells())a=(i=r[n])[0],e=i[1],(o=t.clone()).move(a,e),(_=this.more_move_count(o))<s&&(s=_);return s},e}();var AI5;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI5=function(t){function e(t){this.board=t,this.not_final_depth_limit=1}return extend(e,AI4),e.prototype.search=function(){return this.search_not_final()},e.prototype.search_not_final=function(){var t,e,n,o,r,i,a,s,_,l,c,h;for(e in n=(r=[-64,-1,-1])[0],l=r[1],_=r[2],i=this.board.movable_cells())c=(a=i[e])[0],t=a[1],(o=this.board.clone()).move(c,t),h=this.search_second_move(o,0,n),n<(h+=Setting.BOARD.SCORE[c][t])&&(n=(s=[h,c,t])[0],l=s[1],_=s[2]);return[l,_]},e.prototype.search_second_move=function(t,e,n){var o,r,i,a,s,_,l,c;if(this.not_final_depth_limit<=e)return t.change(),this.evaluate_not_final(t);if(i=64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_not_final_best_of_AI(t,e+1,i):64;for(r in a){if(l=(_=a[r])[0],o=_[1],(s=t.clone()).move(l,o),c=this.search_not_final_best_of_AI(s,e+1,i),(c-=Setting.BOARD.SCORE[l][o])<n)return c;c<i&&(i=c)}return i},e.prototype.search_not_final_best_of_AI=function(t,e,n){var o,r,i,a,s,_,l,c;if(this.not_final_depth_limit<=e)return this.evaluate_not_final(t);if(i=-64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_not_final_best_of_you(t,e+1,i):this.evaluate_not_final(t);for(r in a){if(l=(_=a[r])[0],o=_[1],(s=t.clone()).move(l,o),n<(c=this.search_not_final_best_of_you(s,e+1,i)))return c;i<c&&(i=c)}return i},e.prototype.search_not_final_best_of_you=function(t,e,n){var o,r,i,a,s,_,l,c;if(this.not_final_depth_limit<=e)return t.change(),this.evaluate_not_final(t);if(i=64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_not_final_best_of_AI(t,e+1,i):64;for(r in a){if(l=(_=a[r])[0],o=_[1],(s=t.clone()).move(l,o),(c=this.search_not_final_best_of_AI(s,e+1,i))<n)return c;c<i&&(i=c)}return i},e.prototype.evaluate_not_final=function(t){var e;return e=t.movable_cells_length(),t.change(),e-t.movable_cells_length()},e}();var AI6;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI6=function(t){function e(t){this.board=t,this.not_final_depth_limit=1,this.final_depth_limit=1}return extend(e,AI5),e.prototype.search=function(){return 16<this.board.blank_cells?this.search_not_final():this.search_final()},e.prototype.search_final=function(){var t,e,n,o,r,i,a,s,_,l,c,h;for(e in n=(r=[-64,-1,-1])[0],l=r[1],_=r[2],i=this.board.movable_cells())c=(a=i[e])[0],t=a[1],(o=this.board.clone()).move(c,t),n<(h=this.search_final_best_of_you(o,0,n))&&(n=(s=[h,c,t])[0],l=s[1],_=s[2]);return[l,_]},e.prototype.search_final_best_of_AI=function(t,e,n){var o,r,i,a,s,_,l,c;if(this.final_depth_limit<=e)return this.evaluate_final(t);if(i=-64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_final_best_of_you(t,e+1,i):this.evaluate_final(t);for(r in a){if(l=(_=a[r])[0],o=_[1],(s=t.clone()).move(l,o),(c=this.search_final_best_of_you(s,e+1,i))<n)return c;i<c&&(i=c)}return i},e.prototype.search_final_best_of_you=function(t,e,n){var o,r,i,a,s,_,l,c;if(this.final_depth_limit<=e)return this.evaluate_final(t);if(i=64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_final_best_of_AI(t,e+1,i):this.evaluate_final(t);for(r in a){if(l=(_=a[r])[0],o=_[1],(s=t.clone()).move(l,o),n<(c=this.search_final_best_of_AI(s,e+1,i)))return c;c<i&&(i=c)}return i},e.prototype.evaluate_final=function(t){var e,n,o,r,i,a,s,_,l,c;for(o=0,c=r=0,a=(_=t.cells).length;r<a;c=++r)for(n=i=0,s=(l=_[c]).length;i<s;n=++i)(e=l[n])===t.AI?o+=1:e===t.you&&(o-=1);return o},e}();var AI7;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI7=function(t){function e(t){this.board=t,this.not_final_depth_limit=3,this.final_depth_limit=7}return extend(e,AI6),e}();var AI8;extend=function(t,e){for(var n in e)hasProp.call(e,n)&&(t[n]=e[n]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;AI8=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,AI7),e.prototype.evaluate_not_final=function(t){var e;return e=t.movable_cells_length(),t.change(),e-2*t.movable_cells_length()-t.count_AI()/2},e}(),window.onload=function(){var t;return window.board=new Board,window.board.draw(),$(".big_disk.black").on("click",function(){return window.board.you=Setting.DISK.BLACK,window.board.AI=Setting.DISK.WHITE,$(".mini_disk.you").addClass("black"),$(".mini_disk.AI").addClass("white"),$(".modal").fadeOut(),window.board.draw()}),$(".big_disk.white").on("click",function(){return window.board.you=Setting.DISK.WHITE,window.board.AI=Setting.DISK.BLACK,$(".mini_disk.you").addClass("white"),$(".mini_disk.AI").addClass("black"),$(".modal").fadeOut(),t(),window.board.draw()}),$(".cell").on("click",function(){var e,n,o;if(o=(n=$(this).attr("id").row_col())[0],e=n[1],window.board.can_move(o,e))return window.board.move(o,e),window.board.can_move_anywhere()?t():window.board.change(),window.board.draw(),window.board.can_move_anywhere()?void 0:window.board.draw_result()}),t=function(){var e,n,o;if(o=(n=new AI8(window.board).search())[0],e=n[1],window.board.move(o,e),!window.board.can_move_anywhere()&&(window.board.change(),window.board.can_move_anywhere()))return t()},$(".retry").on("click",function(){return location.reload()})};