// Program Functions

var selected_index = [0, 0];
var dimensions = [4, 3];

var movements = {
    37: [-1, 0],
    38: [0, -1],
    39: [1, 0],
    40: [0, 1]
};
var movement_chars = {
    37: "&#8592;",
    38: "&#8593;",
    39: "&#8594;",
    40: "&#8595;"
};

// this movement happens on enter (default is right)
var default_movement = 39;

var colours = {
    "SELECTED": {'border-color': 'yellow', 'background': '#ffffe0'},
    "DEFAULT": {'border-color': '#000000', 'background': '#ffffff'}
};

function get_program_cells(){
    return $('#befunge_code').find('td').not('.control, .empty')
}

function get_2d_coords(element){
    var x = $(element).index();
    var y = $(element).parent().index();
    return [x, y];
}

function coords_to_index(coords){
    return coords[1]*dimensions[0] + coords[0];
}

function find_at_coords(){
    return $("#befunge_code").find('td').eq(coords_to_index(selected_index));
}

function cell_click(){
    find_at_coords().css(colours["DEFAULT"]);
    selected_index = get_2d_coords(this);
    find_at_coords().css(colours["SELECTED"]);
}

function arrow_press(code){
    if (code) {
        find_at_coords().css(colours["DEFAULT"]);
        // Iterate through dimensions
        for (var x = 0; x < 2; x += 1) {
            selected_index[x] += movements[code][x];
            // -2 : -1 for the controls, -1 for the change from length to index
            if (selected_index[x] == -1) selected_index[x] = dimensions[x] - 2;
            if (selected_index[x] == dimensions[x] - 1) selected_index[x] = 0;
        }
    }
    find_at_coords().css(colours["SELECTED"]);
    find_at_coords().find('textarea').eq(0).select();
}

function keypress(event){
    if (event.which in movements){
        if (event.ctrlKey){
            default_movement = event.which;
            var default_html = "Enter Moves: " + movement_chars[event.which];
            $('#default_move').html(default_html);
        } else{
            arrow_press(event.which);
            event.preventDefault();
        }
    }
    if (event.which == 13){
        arrow_press(default_movement);
        event.preventDefault();
    }
}

function ready(){
    var cells = get_program_cells();
    for (var cell_index = 0; cell_index < cells.length; cell_index++){
        cells.eq(cell_index).on("click", cell_click);
    }
    window.addEventListener('keydown', keypress);

    get_program_cells().html("<textarea class='hidden_input' maxlength='1'></textarea>");

    $('.control').html("<button class='btn-sml'>+</button>");

    arrow_press(false);
}
$(document).ready(ready);

