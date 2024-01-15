(function () {
  /////////////////////////////////////////////////////////////

  // Canvas & Context
  var canvas;
  var ctx;

  // Snake
  var snake;
  var snake_dir;
  var snake_next_dir;
  var snake_speed;

  // Food
  var food = {
    x: 0,
    y: 0,
  };

  // Score
  var score;

  // Wall
  var wall;

  // HTML Elements
  var screen_snake;
  var screen_menu;
  var screen_setting;
  var screen_gameover;
  var button_newgame_menu;
  var button_newgame_setting;
  var button_newgame_gameover;
  var button_setting_menu;
  var button_setting_gameover;
  var ele_score;
  var speed_setting;
  var wall_setting;

  // IMG
  var img = new Image(); // Create new img element
  img.src =
    ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAjdQTFRFAAAA6OjohoaGPj4+UlJSaGhoVFRUKioqMTExYmJimJiYlJSUY2NjYmJinJycl5eXWFhYRUVFSEhINDQ0SUlJdHR0hYWFcnJymJiYmpqaTU1NOzs7QEBARkZGOjo6NDQ0YGBg1NTUx8fHaGhoV1dXdHR0kJCQoqKiqqqqv7+/pKSkYGBgPT09MDAwenp6iYmJoaGh+/v7////8vLyurq6mZmZVlZWIyMjXl5eZ2dn+vr64uLiqampd3d3T09PISEhR0dHxsbGa2trlJSU+Pj4/f39+fn51dXVra2tgYGBSUlJODg4jo6Og4ODiYmJ4eHh9/f32trasrKygoKCREREJiYmMTExhISEmJiYY2Nj3t7ez8/PsbGxxcXFkpKSTExMX19fZmZmHh4eJCQkioqKwcHBT09Ps7OzlpaWampqysrKjY2NzMzMenp6MzMzHBwchISE4uLiVlZWwcHBsLCwzs7O/v7+5eXlnp6eKysrv7+/cnJyj4+P9fX18/Pz29vbdnZ2Li4uvLy8tra239/f0NDQQ0NDXl5ehYWFZ2dnLS0tdnZ2ra2tW1tb0dHRp6enS0tLTk5OSkpKNTU1T09PlZWVaWlplZWVVVVVNjY2R0dHOTk5UlJSlpaWfn5+iIiIuLi4eXl5QkJCKSkpPj4+paWlc3Nzbm5utLS0KSkpKioqqKiocXFxa2trIiIiNjY21dXVg4ODSkpKbGxsPDw8Pz8/Nzc3YGBgR0dHQUFBNzc3NTU1PT09tCz5gQAAAL10Uk5TAAGJ+//////8gwwY6v////////yyFpr////////////EDwTv/////////////3lG///////////Pef///////+gFlv///////////2Jm////////////yiL//////////////9UF8P///////////9QE+v////////9f3P///////1Qu/////////8JD/////////85l////////ZXf///////gSUf////+zMv///3MFqf3//8QRC7///9Ie5i8qAAAAATZJREFUeJxjYAACRiZmFlY2dg5OLgYE4Obh5eMXEBQSFhFFCIqJS0hKScvIyskrKMLElJRVVNXUNTS1tHV09WCC+oIGhkZGRsYmpmbmFjBBS20roJiRtY2tnb2DI1TQydnFyMjVzd3D04vd2wcq6Ovnb2RkGBAYFBwSGhYOFYyIjIqOiY2LT0g0S0pOgQqmpqVnZGZJZudk5+blF0AFC4vSrYtdSkrLyiviK6tg1lfX1Na5pGvVazXoNDbBBJtZ01taG9raOzq77Lthgj29Wn39bF4TJk6SnjwFJjh1Guv03hmTZ+rMkpo9ByY4d96MyPkLDBYumsmyeAlMcGniMvnlWSt4V85SWQUPutVr1rbHN65b583ivR4uuGHjpsSFnWs3S23Zug0Rytt3tGlr75TbtXsPmAsAS0xXkv1rpZ0AAAAASUVORK5CYII=';
  var imgMadar = new Image();
  imgMadar.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAuJQTFRFAAAAdTMyVSIjWyYljEI7YCYlUiEgUSAgUyIil1NSwpGLay4tTx8fRxoaQRgYgzs2hj03ai0qUyEgOBQVQBgYgTw4ejc0RxscPRYWTh4dpGBVx5WI2K6ew4t9kEdAcTAsPhYWYCgnpWdbnltUYCcmQxoYZSoobC4rvIN37dTN8dzT6tDF4b2u4cCyv4d7VCEgPxgWi0Q8RxsaMhESVyQigjs0yZiL7djR8NzR6c7D27Wo166h1KaYejQxPBUWZCknKw8QMRERTR4cgzw0uH9v7dnR9ejc6tHG16+f3rqrikE6UR8eWiQdTB4dMxISPxcWXicknVhLq2pey5yRxI+Htntzu4J0yZiI06iZgzs1QRgYQRgWJCMjLSwsPz47JCMkY2BakIyAlJCGYF5VU1JLaGRcfntyXlpUVlJNKicmPz45PTw5JiUmJyYmNDMypKGWn5uPhYF4g393eHRswLuvjoqEd3RrW1hSNDExQUA7ko+DdnRqQUA8NDMxxL+05OHX0c3Dsaufrqid2NTJuLSsoJuRd3JrMS0rS0pBlZCCj4t9gH5zTk1Gn5yR3NjP3dnQ2NPKvLisuLSpvbmvqKSZjoyCMzIrZWFYjYl+rqyhUlJKi4h9zsq+29fO08/Eo56UjIiAlZGHgHxzXFlTNDIuVVNMW1pTVlZOhoJ3v76zmpeLhYF2gX51VlVPWFdQRUI+UU5FNnYuOHowGkEYKmQmMnEsRoc6L2sqNHMuMGsrLWYpI1UgJFYgJVggPH4zGDwWFzwWJlsiMnIthLdwbqZbU5JEUI9ALWcpIE8dKmEli7p4KmMnGUEXEi8QHkkbX51QiLl2eK9mZKBTIlAeIlIfHEQXrtOfN3oyFDYUEjARFjsVL24rUpVGK2MnHkwcI1QgR4s+L20rFzwWEjAQFDQTGD8WEjESFzsVIlIfSo4/ES8QEjAREjESECsQECwQES8QH0wdFTkVECwQDyoPFjkVG0QY2zY0HQAAAPZ0Uk5TADKx8/bz7Nl+DQFE8f////////3WQELq////////////xwYS1//////////////oPFT+//////////////6WlP/////////////9gQG2///////////////+vwzE////////////////4Ra5////////////////yw11////////////////kwJF/v/////////////rRQ7T/////////////+Q7hvr//////////+RMF7r////////////2YmX8///////////tXQiv///////////pQiXK////////3ycWo/L/////qgUCPs/6///hHAtBg3oqPNAycgAAATxJREFUeJxjYAABRiZmFlY2dg5OBjjg4ubh5eMXEBQSFhGFC4qJS0hKScvIyskrKCpBxZRVVNXUNTS1tHV09fQNoIKGRsYmpmbmFpZW1ja2dlBBewdHJ2cXVzd3D11PL28fiKCvn39AYFBwSGhYeERkVDREMCY2Lj4hMSk5JTUtPSMzCyKYnZObl19QWFRcUlpWXlEJEayqrqmtq29obGpuaW1r74AIdnZ19/T29U+YOGnylKnToLZPnzFz1uw5c+fNX7Bw0eIlMB8tXVa7fMXKVavXrF23fgNMcOOmzVu2btu+Y+eu3Xv2wj2/b/+Bg4cOHzl67PiJk3DBU6fPnD13/sLFS5evXEUE3rXrN27eun3n7oF79xGCDA8ePnr85OmtZ89fIAkyvHz1+s3bd+8/MKCCj58+f/kKYQIA8jx3/Gd30sQAAAAASUVORK5CYII=';

  /////////////////////////////////////////////////////////////

  var activeDot = function (x, y) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x * 10, y * 10, 10, 10);
  };

  /////////////////////////////////////////////////////////////

  var changeDir = function (key) {
    if (key == 38 && snake_dir != 2) {
      snake_next_dir = 0;
    } else {
      if (key == 39 && snake_dir != 3) {
        snake_next_dir = 1;
      } else {
        if (key == 40 && snake_dir != 0) {
          snake_next_dir = 2;
        } else {
          if (key == 37 && snake_dir != 1) {
            snake_next_dir = 3;
          }
        }
      }
    }
  };

  /////////////////////////////////////////////////////////////

  var addFood = function () {
    food.x = Math.floor(Math.random() * (canvas.width / 10 - 1));
    food.y = Math.floor(Math.random() * (canvas.height / 10 - 1));
    for (var i = 0; i < snake.length; i++) {
      if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
        addFood();
      }
    }
  };

  /////////////////////////////////////////////////////////////

  var checkBlock = function (x, y, _x, _y) {
    return x == _x && y == _y ? true : false;
  };

  /////////////////////////////////////////////////////////////

  var altScore = function (score_val) {
    ele_score.innerHTML = String(score_val);
  };

  /////////////////////////////////////////////////////////////

  var mainLoop = function () {
    var _x = snake[0].x;
    var _y = snake[0].y;
    snake_dir = snake_next_dir;

    // 0 - Up, 1 - Right, 2 - Down, 3 - Left
    switch (snake_dir) {
      case 0:
        _y--;
        break;
      case 1:
        _x++;
        break;
      case 2:
        _y++;
        break;
      case 3:
        _x--;
        break;
    }

    snake.pop();
    snake.unshift({
      x: _x,
      y: _y,
    });

    // --------------------

    // Wall

    if (wall == 1) {
      // On
      if (
        snake[0].x < 0 ||
        snake[0].x == canvas.width / 10 ||
        snake[0].y < 0 ||
        snake[0].y == canvas.height / 10
      ) {
        showScreen(3);
        return;
      }
    } else {
      // Off
      for (var i = 0, x = snake.length; i < x; i++) {
        if (snake[i].x < 0) {
          snake[i].x = snake[i].x + canvas.width / 10;
        }
        if (snake[i].x == canvas.width / 10) {
          snake[i].x = snake[i].x - canvas.width / 10;
        }
        if (snake[i].y < 0) {
          snake[i].y = snake[i].y + canvas.height / 10;
        }
        if (snake[i].y == canvas.height / 10) {
          snake[i].y = snake[i].y - canvas.height / 10;
        }
      }
    }

    // --------------------

    // Autophagy death
    for (var i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        showScreen(3);
        return;
      }
    }

    // --------------------

    // Eat Food
    if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
      snake[snake.length] = {
        x: snake[0].x,
        y: snake[0].y,
      };
      score += 1;
      altScore(score);
      addFood();
      activeDot(food.x, food.y);
    }

    // --------------------

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --------------------

    for (var i = snake.length - 1; i > -1; i--) {
      if (!i) {
        ctx.drawImage(img, snake[i].x * 10 - 5, snake[i].y * 10 - 5);
      } else {
        activeDot(snake[i].x, snake[i].y);
      }
    }

    // --------------------

    activeDot(food.x, food.y);
    ctx.drawImage(imgMadar, food.x * 10 - 5, food.y * 10 - 5);

    // Debug
    //document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;

    setTimeout(mainLoop, snake_speed);
  };

  /////////////////////////////////////////////////////////////

  var newGame = function () {
    showScreen(0);
    screen_snake.focus();

    snake = [];
    for (var i = 4; i >= 0; i--) {
      snake.push({
        x: i,
        y: 15,
      });
    }

    snake_next_dir = 1;

    score = 0;
    altScore(score);

    addFood();

    canvas.onkeydown = function (evt) {
      evt = evt || window.event;
      changeDir(evt.keyCode);
    };
    mainLoop();
  };

  /////////////////////////////////////////////////////////////

  // Change the snake speed...
  // 150 = slow
  // 100 = normal
  // 50 = fast
  var setSnakeSpeed = function (speed_value) {
    snake_speed = speed_value;
  };

  /////////////////////////////////////////////////////////////
  var setWall = function (wall_value) {
    wall = wall_value;
    if (wall == 0) {
      screen_snake.style.borderColor = '#606060';
    }
    if (wall == 1) {
      screen_snake.style.borderColor = '#FFFFFF';
    }
  };

  /////////////////////////////////////////////////////////////

  // 0 for the game
  // 1 for the main menu
  // 2 for the settings screen
  // 3 for the game over screen
  var showScreen = function (screen_opt) {
    switch (screen_opt) {
      case 0:
        screen_snake.style.display = 'block';
        screen_menu.style.display = 'none';
        screen_setting.style.display = 'none';
        screen_gameover.style.display = 'none';
        break;

      case 1:
        screen_snake.style.display = 'none';
        screen_menu.style.display = 'block';
        screen_setting.style.display = 'none';
        screen_gameover.style.display = 'none';
        break;

      case 2:
        screen_snake.style.display = 'none';
        screen_menu.style.display = 'none';
        screen_setting.style.display = 'block';
        screen_gameover.style.display = 'none';
        break;

      case 3:
        screen_snake.style.display = 'none';
        screen_menu.style.display = 'none';
        screen_setting.style.display = 'none';
        screen_gameover.style.display = 'block';
        break;
    }
  };

  /////////////////////////////////////////////////////////////

  window.onload = function () {
    canvas = document.getElementById('snake');
    ctx = canvas.getContext('2d');

    // Screens
    screen_snake = document.getElementById('snake');
    screen_menu = document.getElementById('menu');
    screen_gameover = document.getElementById('gameover');
    screen_setting = document.getElementById('setting');

    // Buttons
    button_newgame_menu = document.getElementById('newgame_menu');
    button_newgame_setting = document.getElementById('newgame_setting');
    button_newgame_gameover = document.getElementById('newgame_gameover');
    button_setting_menu = document.getElementById('setting_menu');
    button_setting_gameover = document.getElementById('setting_gameover');

    // etc
    ele_score = document.getElementById('score_value');
    speed_setting = document.getElementsByName('speed');
    wall_setting = document.getElementsByName('wall');

    // --------------------

    button_newgame_menu.onclick = function () {
      newGame();
    };
    button_newgame_gameover.onclick = function () {
      newGame();
    };
    button_newgame_setting.onclick = function () {
      newGame();
    };
    button_setting_menu.onclick = function () {
      showScreen(2);
    };
    button_setting_gameover.onclick = function () {
      showScreen(2);
    };

    setSnakeSpeed(150);
    setWall(1);

    showScreen('menu');

    // --------------------
    // Settings

    // speed
    for (var i = 0; i < speed_setting.length; i++) {
      speed_setting[i].addEventListener('click', function () {
        for (var i = 0; i < speed_setting.length; i++) {
          if (speed_setting[i].checked) {
            setSnakeSpeed(speed_setting[i].value);
          }
        }
      });
    }

    // wall
    for (var i = 0; i < wall_setting.length; i++) {
      wall_setting[i].addEventListener('click', function () {
        for (var i = 0; i < wall_setting.length; i++) {
          if (wall_setting[i].checked) {
            setWall(wall_setting[i].value);
          }
        }
      });
    }

    document.onkeydown = function (evt) {
      if (screen_gameover.style.display == 'block') {
        evt = evt || window.event;
        if (evt.keyCode == 32) {
          newGame();
        }
      }
    };
  };
})();
