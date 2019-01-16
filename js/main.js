var ship;
var enemy1 = [];
var enemy2 = [];
var bullet = [];
var fireagain = true;
var points = 0;
var level = 1;
var max = 400;
var obstacle = [];
var intid;
var life = 5;
var tilter = [];

function update()
{
    var forward = document.getElementById('canvy');
    var ctx = forward.getContext('2d');
    ctx.beginPath();
    ctx.clearRect(0, 0, forward.width, forward.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, forward.width, forward.height);
    ctx.closePath;
    var forward2 = document.getElementById('canv-help');
    var ctx2 = forward2.getContext('2d');
    ctx2.beginPath();
    ctx2.clearRect(0, 0, forward2.width, forward2.height);
    ctx2.fillStyle = "#111";
    ctx2.fillRect(0, 0, forward2.width, forward2.height);
    ctx2.closePath;
    draw();
}

window.onload = function ()
{
    {
        {
            var x = document.createElement('canvas');
            x.setAttribute('id', 'canvy');
            x.setAttribute('width', '800');
            x.setAttribute('height', '600');
            x.setAttribute('style', 'border: 1px solid #fff; position: absolute; left:' + ((window.innerWidth / 2) - 400) + 'px; top: ' + ((window.innerHeight / 2) - 300) + 'px;');
            document.getElementsByTagName('body')[0].appendChild(x);
        }
        {
            var x = document.createElement('canvas');
            x.setAttribute('id', 'canv-help');
            x.setAttribute('width', '800');
            x.setAttribute('height', '600');
            x.setAttribute('style', 'display: none; border: 1px solid #fff; position: absolute; left:' + ((window.innerWidth / 2) - 400) + 'px; top: ' + ((window.innerHeight / 2) - 300) + 'px;');
            document.getElementsByTagName('body')[0].appendChild(x);
        }
        {
            {
                var x = document.createElement('div');
                x.setAttribute('id', 'punkty');
                x.setAttribute('width', '70%');
                x.setAttribute('height', '100%');
                x.setAttribute('style', 'position: absolute; left:' + ((window.innerWidth / 2) - 400) + 'px; top: ' + ((window.innerHeight / 2) - 380) + 'px;');
                document.getElementsByTagName('body')[0].appendChild(x);
            }
            {
                var x = document.createElement('div');
                x.setAttribute('id', 'zycia');
                x.setAttribute('width', '30%');
                x.setAttribute('height', '100%');
                x.setAttribute('style', 'position: absolute; left:' + ((window.innerWidth / 2) + 100) + 'px; top: ' + ((window.innerHeight / 2) - 380) + 'px;');
                document.getElementsByTagName('body')[0].appendChild(x);
            }
        }
        ship = new Ship();
        setup();
        intid = setInterval(update, 1000 / 60);
    }
    document.onkeydown = function (e)
    {
        keyPressed(e.which);
    }
    document.onclick = function (e)
    {
        var forward = document.getElementById('canv-help');
        var ctx = forward.getContext('2d');
        console.log(ctx.getImageData(e.clientX, e.clientY, 1, 1).data)
    }
}

function setup()
{
    obstacle = [];
    enemy1 = [];
    enemy2 = [];
    tilter = [];
    for (var i = 1; i < 40; i++)
    {
        for (var j = 1; j < 28; j++)
        {
            if (Math.random() > 0.90)
            {
                console.log("GO")
                var obs = new Obstacle(i, j);
                obstacle.push(obs);
            }
        }
    }
    var s1 = parseInt(Math.random() * max);
    for (var i = 0; i < 8; i++)
    {
        if (level > 3)
        {
            enemy1[i] = new Enemy(parseInt(3 * i * 15));
            enemy2[i] = new Enemy(parseInt(3 * i * 15 + 200));
            enemy1[i].speed += level / 12;
            enemy2[i].speed += level / 12;
        }
        else
        {           
            enemy1[i] = new Enemy(parseInt(level * i * 15 + s1));
            enemy2[i] = new Enemy(parseInt(level * i * 15 + parseInt(s1 + 200 * level)));
        }
    }
}

function draw()
{
    if ((Math.random() * 1000000 / (level * 50)) < 5)
    {
        var tilt = new Tilter();
        tilt.speed += level / 15;
        tilter.push(tilt);
    }

    for (var i = 0; i < tilter.length; i++)
    {
        tilter[i].show();
        tilter[i].move();
    }

    ship.show();
    for (var i = 0; i < obstacle.length; i++)
        obstacle[i].show();

    for (var i = 0; i < enemy1.length; i++)
    {
        enemy1[i].show();
        enemy1[i].move();
    }
    for (var i = 0; i < enemy2.length; i++)
    {
        enemy2[i].show();
        enemy2[i].move();
    }
        
    for (var i = 0; i < bullet.length; i++)
    {       
        bullet[i].show();
        bullet[i].move();
        
        for (var j = 0; j < enemy1.length; j++)
            if (bullet[i].hits(enemy1[j]))
            {
                bullet[i].disap();
                enemy1[j].kill();
                var obs = new Obstacle((enemy1[j].x - enemy1[j].r) / 20, (enemy1[j].y - enemy1[j].r - 6) / 20);
                obstacle.push(obs);
            }

        for (var j = 0; j < enemy2.length; j++)
            if (bullet[i].hits(enemy2[j]))
            {
                bullet[i].disap();
                enemy2[j].kill()
                var obs = new Obstacle((enemy2[j].x - enemy2[j].r) / 20, (enemy2[j].y - enemy2[j].r - 6) / 20);
                obstacle.push(obs);
            }

        for (var j = 0; j < obstacle.length; j++)
        {
            if (bullet[i].hitt(obstacle[j]))
            {
                bullet[i].disap();
                obstacle[j].kill();
            }
        }

        for (var j = 0; j < tilter.length; j++)
        {
            if (bullet[i].hitt(tilter[j]))
            {
                bullet[i].disap();
                tilter[j].kill();
                var obs = new Obstacle((tilter[j].x - tilter[j].r) / 20, (tilter[j].y - tilter[j].r - 6) / 20);
                obstacle.push(obs);
            }
        }

        if (bullet[i].y < 0)
            bullet[i].disap();
    }

    for (var i = 0; i < bullet.length; i++)
        if (bullet[i].toDelete)
            bullet.splice(i, 1);

    for (var i = 0; i < enemy1.length; i++)
        if (enemy1[i].killed)
            enemy1.splice(i, 1);

    for (var i = 0; i < enemy2.length; i++)
        if (enemy2[i].killed)
            enemy2.splice(i, 1);

    for (var i = 0; i < tilter.length; i++)
        if (tilter[i].killed)
            tilter.splice(i, 1);

    for (var i = 0; i < obstacle.length; i++)
        if (obstacle[i].killed > 4)
            obstacle.splice(i, 1);

    if (enemy2.length == 0 & enemy1.length == 0)
    {
        if(level < 50)
        level += 0.2, max -= 50;
        setup();
    }
    document.getElementById('zycia').innerHTML = "Ilość żyć: "+life;
    document.getElementById('punkty').innerHTML = "Ilość punktów: "+parseInt(points);
}

function keyPressed(key)
{
    if (intid != null)
    {
        if (key == 65)
        {
            ship.move(-1, 0);
        }
        else if (key == 68)
        {
            ship.move(1, 0);
        }
        else if (key == 87)
        {
            ship.move(0, -1);
        }
        else if (key == 83)
        {
            ship.move(0, 1);
        }
        else if (key == 32)
        {
            if (fireagain)
            {
                var drop = new Bullet(ship.x + 10, ship.y);
                bullet.push(drop);
                fireagain = false;
                setTimeout(function () { fireagain = true; }, 250);
            }
        }
    }
}

function restart()
{
    life--;
    if (life > 0)
    {
        clearInterval(intid);
        intid = null;
        setTimeout(function () {intid = setInterval(update, 1000 / 60); ship = new Ship();}, 2000);
        setup();
    }
    else
        endGame();
}

function endGame()
{
    clearInterval(intid);
    window.alert("Koniec gry, twój wynik to: " + parseInt(points));
    setTimeout(function () { location.reload(true); }, 5000);
}
