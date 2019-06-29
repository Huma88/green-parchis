//(function() {

	var replicate = function(x, n) {
		var arr = [];
		while(n > 0) {
			arr.push(x);
			n--;
		}
		return arr;
	}

	var nth_color = function(lightness, nb_colors, i) {
		return "hsl(" + (360/nb_colors * i) + ", 85%, " + lightness + "%)";
	}

	var Player = function(id_player, nb_tokens) {
		this.id_player = id_player;
		this.nb_tokens = nb_tokens;
		// initialize tokens
		this.tokens = replicate(0, this.nb_tokens);
		this.tokens_in_promotion = replicate(false, this.nb_tokens);
		this.tokens_moved = replicate(false, this.nb_tokens);
	}

	Player.prototype.number_tokens_out = function() {
		return this.tokens.filter(function(x){ return x === 0;}).length;
	};

	var Parchis = function(id_canvas, options) {
		// options
		options = options === undefined ? {} : options;
		options.nb_players = options.nb_players === undefined ? 4 : options.nb_players;
		options.nb_tokens = options.nb_tokens === undefined ? 4 : options.nb_tokens;
		options.nb_cells = options.nb_cells === undefined ? 16 : options.nb_cells;
		options.nb_promotion_cells = options.nb_promotion_cells === undefined ? 8 : options.nb_promotion_cells;
		options.initial_cell = options.initial_cell === undefined || options.initial_cell < 1 ? options.nb_cells/2 : options.initial_cell;
		options.size = options.size === undefined ? 500 : options.size;
		options.secure_cells = options.secure_cells === undefined ? [options.initial_cell] : options.secure_cells;
		options.nb_bridge = options.nb_bridge === undefined ? options.nb_players : options.nb_bridge;
		this.canvas = document.getElementById(id_canvas);
		this.nb_players = options.nb_players;
		this.nb_tokens = options.nb_tokens;
		this.nb_cells = options.nb_cells;
		this.nb_promotion_cells = options.nb_promotion_cells;
		this.initial_cell = options.initial_cell;
		this.secure_cells = options.secure_cells;
		this.nb_bridge = options.nb_bridge;
		this.size = options.size;
		this.players = [];
		this.colors = [];
		// initialize players
		for(var i = 0; i < this.nb_players; i++)
			this.players.push(new Player(i+1, this.nb_tokens));
		// set canvas
		this.canvas.style.width = this.size;
		this.canvas.style.height = this.size;
		this.canvas.width = this.size;
		this.canvas.height = this.size;
		this.draw();
	};

	Parchis.prototype.draw = function() {
		var x, y;
		var tokens_per_cell = replicate(0, this.nb_players * this.nb_cells);
		// context
		var ctx = this.canvas.getContext("2d");
		// properties of the polygon
		var cell_angle = 360 / (this.nb_cells * this.nb_players);
		var padding = 30;
		var outline = 30;
		var radius = this.size/2 - padding - outline;
		var cell_radius = Math.min(Math.sin(cell_angle * Math.PI / 180)*radius/2, radius/(this.nb_promotion_cells+1)/2);
		var angle = 360 / this.nb_players;
		var side = 2 * (this.size/2) * Math.sin(180/this.nb_players * Math.PI/180);
		// draw table
		ctx.lineWidth = 5;
		for(var i = 0; i < this.nb_players; i++) {
			// section
			ctx.fillStyle = nth_color(85, this.nb_players, this.nb_players - i - 1);
			ctx.beginPath();
			ctx.moveTo(this.size/2, this.size/2);
			ctx.lineTo(
				this.size/2 + (radius+padding) * Math.cos(360/this.nb_players * i * Math.PI / 180),
				this.size/2 + (radius+padding) * Math.sin(360/this.nb_players * i * Math.PI / 180));
			ctx.arc(this.size/2, this.size/2, radius+padding, 360/this.nb_players * i * Math.PI / 180, 360/this.nb_players * (i+1) * Math.PI / 180);
			ctx.closePath();
			ctx.fill();
			// arc
			ctx.beginPath();
			ctx.strokeStyle = nth_color(30, this.nb_players, this.nb_players - i - 1);
			ctx.arc(this.size/2, this.size/2, radius+padding, 360/this.nb_players * i * Math.PI / 180, 360/this.nb_players * (i+1) * Math.PI / 180);
			ctx.stroke();
			ctx.closePath();
		}
		ctx.fillStyle = "#444444";
		ctx.beginPath();
		ctx.strokeStyle = nth_color(30, this.nb_players, this.nb_players - i - 1);
		ctx.arc(this.size/2, this.size/2, cell_radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		// draw cells
		ctx.lineWidth = 2;
		for(var i = 0; i < this.nb_cells * this.nb_players; i++) {
			ctx.strokeStyle = nth_color(30, this.nb_players, Math.floor(i / this.nb_cells));
			if(this.secure_cells.indexOf(i % this.nb_cells + 1) !== -1)
				ctx.fillStyle = nth_color(95, this.nb_players, Math.floor(i / this.nb_cells));
			else
				ctx.fillStyle = nth_color(65, this.nb_players, Math.floor(i / this.nb_cells));
			x = this.size/2 + radius * Math.cos((360 - i * cell_angle) * Math.PI/180);
			y = this.size/2 + radius * Math.sin((360 - i * cell_angle) *  Math.PI/180);
			ctx.beginPath();
			ctx.arc(x, y, cell_radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
			if(this.secure_cells.indexOf(i % this.nb_cells + 1) !== -1)
				ctx.stroke();
			ctx.fillStyle = nth_color(30, this.nb_players, Math.floor(i / this.nb_cells));
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "10px Arial";
			ctx.fillText(i+1, x, y); 
		}
		// draw promotion cells
		for(var i = 0; i < this.nb_players; i++) {
			for(var j = 0; j < this.nb_promotion_cells; j++) {
				ctx.strokeStyle = nth_color(30, this.nb_players, i);
				ctx.fillStyle = nth_color(65, this.nb_players, i);
				x = this.size/2 + (radius/(this.nb_promotion_cells+1) * (j+1)) * Math.cos((360 - i * this.nb_cells * cell_angle) * Math.PI/180);
				y = this.size/2 + (radius/(this.nb_promotion_cells+1) * (j+1)) * Math.sin((360 - i * this.nb_cells * cell_angle) *  Math.PI/180);
				ctx.beginPath();
				ctx.arc(x, y, cell_radius, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
		// draw intial cells
		for(var i = 0; i < this.nb_players; i++) {
			ctx.fillStyle = nth_color(30, this.nb_players, i);
			x = this.size/2 + (radius + padding) * Math.cos((360 - (i * this.nb_cells + this.initial_cell - 1) * cell_angle) * Math.PI/180);
			y = this.size/2 + (radius + padding) * Math.sin((360 - (i * this.nb_cells + this.initial_cell - 1) * cell_angle) *  Math.PI/180);
			ctx.beginPath();
			ctx.arc(x, y, cell_radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
			// number of tokens
			ctx.fillStyle = nth_color(100, this.nb_players, Math.floor(i / this.nb_cells));
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "12px Arial";
			ctx.fillText(this.players[i].number_tokens_out(), x, y); 
		}
		// draw tokens
		ctx.lineWidth = 1;
		for(var i = 0; i < this.nb_players; i++) {
			ctx.fillStyle = nth_color(35, this.nb_players, i);
			ctx.strokeStyle = nth_color(20, this.nb_players, i);
			for(var j = 0; j < this.nb_tokens; j++) {
				var cell = this.players[i].tokens[j];
				if(cell !== 0) {
					x = this.size/2 + radius * Math.cos((360 - (cell-1) * cell_angle) * Math.PI/180);
					y = this.size/2 + radius * Math.sin((360 - (cell-1) * cell_angle) * Math.PI/180);
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.lineTo(
						x + cell_radius * Math.cos(360 / this.nb_bridge * tokens_per_cell[cell] * Math.PI / 180),
						y + cell_radius * Math.sin(360 / this.nb_bridge * tokens_per_cell[cell] * Math.PI / 180));
					ctx.arc(x, y, cell_radius,
						360 / this.nb_bridge * tokens_per_cell[cell] * Math.PI / 180,
						360 / this.nb_bridge * (tokens_per_cell[cell]+1) * Math.PI / 180);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					tokens_per_cell[cell]++;
				}
			}
		}
	};

//})();
