function Bullet(x, y)
{
    var forward = document.getElementById('canvy');
    var ctx = forward.getContext('2d');
    this.x = x;
    this.y = y;
    this.toDelete = false;

    function distance(x1, y1, x2, y2)
    {
        var x = Math.abs(x2 - x1);
        var y = Math.abs(y2 - y1);
        return Math.sqrt((x * x) + (y * y));
    }

    this.disap = function ()
    {
        this.toDelete = true;
    }

    this.show = function ()
    {
        ctx.beginPath();
        ctx.rect(this.x-2, this.y-10, 4, 10);
        ctx.fillStyle = "#f00";
        ctx.fill();
        ctx.closePath();
    }

    this.move = function ()
    {
        this.y -= 7;
    }

    this.hitt = function (obs)
    {
        var rang = 0;
        if (obs.r !== undefined)
            rang = 8;
        var dis = distance(this.x, this.y, obs.x+5, obs.y+5);
        if(dis < 7.0+ rang)
        {
            points += level*obs.value;
            return true;
        }
        else
        {
            return false;
        }
    }

    this.hits = function (enemy)
    {
        var dis = distance(this.x, this.y, enemy.x, enemy.y);
        if (dis < enemy.r)
        {
            points+= level*enemy.value;
            return true;
        }
        else
        {
            return false;
        }
    }

}