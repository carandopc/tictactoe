(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},8:function(e,t,a){e.exports=a(9)},9:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(2),s=a(4),i=a(3),o=a(5),l=a(0),c=a.n(l),u=a(7),h=a.n(u);a(15);function d(e,t){for(var a=[],r=0;r<t;r++){for(var n=[],s=0;s<t;s++){var i=t*r+s;n.push(i)}a.push(n)}for(var o=0;o<t;o++){for(var l=[],c=0;c<t;c++){var u=t*c+o;l.push(u)}a.push(l)}for(var h=[],d=0;d<t;d++){var v=(+t+1)*d;h.push(v)}a.push(h);for(var m=[],p=0;p<t;p++){var b=(t-1)*(p+1);m.push(b)}a.push(m),console.log(a),console.log(e);for(var f=0;f<a.length;f++){for(var k=!0,S=a[f],y=e[S[0]],N=1;N<a[f].length;N++){var w=e[S[N]];k&&y&&w===y||(k=!1)}if(k)return{player:y,line:S}}return null}function v(e){var t;return"winner"===e.status?t={backgroundColor:"crimson",color:"white"}:"clicked"===e.status&&(t={color:"crimson"}),c.a.createElement("button",{className:"square",onClick:e.onClick,style:t},e.value)}var m=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(n.a)(t,[{key:"renderSquare",value:function(e){var t,a=this;return this.props.winner&&this.props.winner.line.includes(e)?t="winner":this.props.clicked===e&&(t="clicked"),c.a.createElement(v,{value:this.props.squares[e],onClick:function(){return a.props.onClick(e)},status:t,key:e})}},{key:"render",value:function(){for(var e=this.props.boardSize,t=[],a=0;a<e;a++){for(var r=[],n=0;n<e;n++)r.push(this.renderSquare(e*a+n));t.push(c.a.createElement("div",{className:"board-row",key:a},r))}return c.a.createElement("div",null,t)}}]),t}(c.a.Component),p=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={history:[{squares:Array(9).fill(null)}],location:[{col:null,row:null}],stepNumber:0,xIsNext:!0,clicked:null,reversed:!1,boardSize:3,newBoardSize:3,boardSizeValid:!1},a}return Object(o.a)(t,e),Object(n.a)(t,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),a=this.state.location.slice(0,this.state.stepNumber+1),r=t[t.length-1].squares.slice();d(r,this.state.boardSize)||r[e]||(r[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:r}]),location:a.concat([{col:e%3,row:Math.floor(e/3)}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){var t=this.state.location[e];this.setState({stepNumber:e,xIsNext:e%2===0,clicked:t.col+3*t.row})}},{key:"reverseOrder",value:function(){this.setState({reversed:!this.state.reversed})}},{key:"resetGame",value:function(){this.setState({history:[{squares:Array(9).fill(null)}],location:[{col:null,row:null}],stepNumber:0,xIsNext:!0,clicked:null,reversed:!1})}},{key:"changeBoardSize",value:function(e){e.preventDefault();var t=this.state.newBoardSize;this.resetGame(),this.setState({boardSize:t})}},{key:"setBoardSize",value:function(e){var t=e.target.value,a=!1,r=this.state.boardSize;t.match(/^\d+$/)&&(a=!0,r=t),this.setState({boardSizeValid:a,newBoardSize:r})}},{key:"render",value:function(){var e,t,a=this,r=this.state.history,n=this.state.location,s=this.state.reversed,i=this.state.clicked,o=r[this.state.stepNumber],l=this.state.boardSize,u=d(o.squares,l),h=r.map(function(e,t){s&&(t=r.length-1-t);var i="("+n[t].col+","+n[t].row+")",o=t?"Go to move #"+t+" "+i:"Go to game start";return c.a.createElement("li",{key:t},c.a.createElement("button",{onClick:function(){return a.jumpTo(t)}},o))});return e=!u&&this.state.stepNumber>=l*l?"Draw":u?"Winner: "+u.player:"Next player: "+(this.state.xIsNext?"X":"O"),t=s?"Sort ascending":"Sort descending",c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"game-board"},c.a.createElement(m,{squares:o.squares,onClick:function(e){return a.handleClick(e)},winner:u,clicked:i,boardSize:l})),c.a.createElement("div",{className:"game-info"},c.a.createElement("div",{className:"status"},e),c.a.createElement("div",{className:"buttons"},c.a.createElement("input",{type:"tel",placeholder:this.state.boardSize,onChange:function(e){return a.setBoardSize(e)}}),c.a.createElement("button",{onClick:function(e){return a.changeBoardSize(e)},disabled:!this.state.boardSizeValid},"Change board size"),c.a.createElement("button",{onClick:function(){return a.reverseOrder()}},t),c.a.createElement("button",{onClick:function(){return a.resetGame()}},"Reset game")),c.a.createElement("ol",null,h)))}}]),t}(c.a.Component);h.a.render(c.a.createElement(p,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.bec13044.chunk.js.map