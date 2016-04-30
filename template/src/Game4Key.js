var game4KeyLayer = cc.Layer.extend({
    ctor:function() {
        // body...
        this._super();
        var winSize = cc.director.getWinSize();
        var pLabel = new cc.LabelTTF("Game4KeyScene", "Arial", 40);
        pLabel.setPosition(winSize.width / 2, winSize.height - pLabel.height - 15);
        //console.log(winSize.height);
        this.addChild(pLabel, 1);

        var perKeyW = winSize.width / 4;
        this.perNoteBottom_X = perKeyW;
        this.speed = 1;
        this.score = 0;
        this.curCombo = 0;

        this.key1Rect = cc.rect(0, 0, perKeyW, winSize.height / 4);
        this.key2Rect = cc.rect(perKeyW * 1, 0, perKeyW, winSize.height / 4);
        this.key3Rect = cc.rect(perKeyW * 2, 0, perKeyW, winSize.height / 4);
        this.key4Rect = cc.rect(perKeyW * 3, 0, perKeyW, winSize.height / 4);

        //var key2Rect = CCRectMake(origin.x+perKeyW,origin.y,origin.x+perKeyW,origin.y+visibleSize.height/2);
        //var key3Rect = CCRectMake(origin.x+perKeyW*2,origin.y,origin.x+perKeyW,origin.y+visibleSize.height/2);
        //var key4Rect = CCRectMake(origin.x+perKeyW*3,origin.y,origin.x+perKeyW,origin.y+visibleSize.height/2);

        var pSprite = new cc.Sprite(s_Andy_png);
        pSprite.setPosition(winSize.width/2 , winSize.height/2);
        this.addChild(pSprite, 0);

        var panlGameSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("panl_game.png"));
        panlGameSprite.setAnchorPoint(0.5,1);
        panlGameSprite.setPosition(winSize.width/2,winSize.height - 240);
        this.addChild(panlGameSprite, 1);

        var panl4KSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("panl_4k.png"));
        this.addChild(panl4KSprite);

        var bornPerx = panlGameSprite.getContentSize().width / 8 / 4;
        var tleftx =  winSize.width / 2 - 1.5 * bornPerx;
        var trightx = tleftx + 4 * bornPerx - 15;
        this.bornNotePos1 = cc.p(tleftx,winSize.height/2);
        this.bornNotePos2 = cc.p(tleftx+bornPerx,winSize.height/2);
        this.bornNotePos3 = cc.p(tleftx+2*bornPerx,winSize.height/2);
        this.bornNotePos4 = cc.p(trightx,winSize.height/2);

        var bottomButton0_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_1.png"));
        bottomButton0_1.setPosition(perKeyW/2+4,bottomButton0_1.getContentSize().height/2+18);
        this.addChild(bottomButton0_1, 3);
        var bottomButton0_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_2.png"));
        bottomButton0_2.setPosition(perKeyW+perKeyW/2+2,bottomButton0_2.getContentSize().height/2+18);
        this.addChild(bottomButton0_2, 3);
        var bottomButton0_3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_3.png"));
        bottomButton0_3.setPosition(perKeyW*2+perKeyW/2-2,bottomButton0_3.getContentSize().height/2+18);
        this.addChild(bottomButton0_3, 3);
        var bottomButton0_4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_4.png"));
        bottomButton0_4.setPosition(perKeyW*3+perKeyW/2-4,bottomButton0_4.getContentSize().height/2+18);
        this.addChild(bottomButton0_4, 3);

        var bottomButton1_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_1.png"));
        bottomButton1_1.setPosition(perKeyW/2+4,bottomButton1_1.getContentSize().height/2+18);
        this.addChild(bottomButton1_1, -10);
        var bottomButton1_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_2.png"));
        bottomButton1_2.setPosition(perKeyW+perKeyW/2+2,bottomButton1_2.getContentSize().height/2+18);
        this.addChild(bottomButton1_2, -10);
        var bottomButton1_3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_3.png"));
        bottomButton1_3.setPosition(perKeyW*2+perKeyW/2-2,bottomButton1_3.getContentSize().height/2+18);
        this.addChild(bottomButton1_3, -10);
        var bottomButton1_4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_4.png"));
        bottomButton1_4.setPosition(perKeyW*3+perKeyW/2-4,bottomButton1_4.getContentSize().height/2+18);
        this.addChild(bottomButton1_4, -10);

        var comble = new cc.LabelBMFont("", s_Futura);
        comble.setPosition(winSize.width / 2, winSize.height / 2 + 30);
        this.addChild(comble, 10, 10);

        var scoreLable = new cc.LabelAtlas("00", s_Jinscore_plist);
        //scoreLable.setString("0");
        scoreLable.setPosition(winSize.width - 20, winSize.height - 40);
        this.addChild(scoreLable, 10, 11);
        //scoreLable.setPosition(winSize.width*2/3, winSize.height/2);

        this.perfectRect =
            cc.rect(bottomButton0_1.getPosition().x,bottomButton0_1.getPosition().y,bottomButton0_1.getContentSize().width,bottomButton0_1.getContentSize().height);
        this.bPerfectRect =
            cc.rect(bottomButton0_1.getPosition().x,bottomButton0_1.getPosition().y,bottomButton0_1.getContentSize().width,bottomButton0_1.getContentSize().height/2);
        this.greatRect =
            cc.rect(panl4KSprite.getPosition().x,panl4KSprite.getPosition().y,panl4KSprite.getContentSize().width,panl4KSprite.getContentSize().height*2);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());  //相对于target左下解的坐标（x,y）
                var touchKey = target.containsTouchLocation(locationInNode);
                console.log(touchKey);
                switch (touchKey) {
                    case 1:
                        console.log("key1");
                        //draw1->drawPolygon(star1, sizeof(star1) / sizeof(star1[0]),
                        //ccc4f(0.2, 0.8, 1, 0.5), 1, ccc4f(0, 0, 1, 255));
                        //zOrderSprite(bottomButton0_1, bottomButton1_1);
                        target.showCombo(target.checkScore(target.getChildByTag(1)));
                        break;
                    case 2:
                        console.log("key2");
                        target.showCombo(target.checkScore(target.getChildByTag(2)));
                        break;
                    case 3:
                        console.log("key3");
                        target.showCombo(target.checkScore(target.getChildByTag(3)));
                        break;
                    case 4:
                        console.log("key4");
                        target.showCombo(target.checkScore(target.getChildByTag(4)));
                        break;
                    default:
                        break;
                }
            }
        });

        cc.audioEngine.playMusic(s_Andy_mp3, true);
        cc.eventManager.addListener(listener,this);

        this.schedule(this.born,0.5);  

        return true;
    },



    born:function(){
        var rand=Math.random();
        rand=rand*100;
        rand=(Math.floor(rand))%4+1;

        if (rand == 1) {
            var musicNote_4_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_1.png"));
            musicNote_4_1.setPosition(this.bornNotePos1);//bornNotePos1
            musicNote_4_1.setScale(0.25);
            this.addChild(musicNote_4_1, 4, 1);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 1),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X/2-10 , 10)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_1));
            musicNote_4_1.runAction(seq);
        }

        if (rand == 2) {
            var musicNote_4_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_2.png"));
            musicNote_4_2.setPosition(this.bornNotePos2);//bornNotePos1
            musicNote_4_2.setScale(0.25);
            this.addChild(musicNote_4_2, 4, 2);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 1),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X*3/2-5 , 10)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_2));
            musicNote_4_2.runAction(seq);
        }

        if (rand == 3) {
            var musicNote_4_3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_3.png"));
            musicNote_4_3.setPosition(this.bornNotePos3);//bornNotePos1
            musicNote_4_3.setScale(0.25);
            this.addChild(musicNote_4_3, 4, 3);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 1),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X*5/2 , 10)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_3));
            musicNote_4_3.runAction(seq);
        }

        if (rand == 4) {
            var musicNote_4_4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_4.png"));
            musicNote_4_4.setPosition(this.bornNotePos4);//bornNotePos1
            musicNote_4_4.setScale(0.25);
            this.addChild(musicNote_4_4, 4, 4);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 1),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X*7/2+20 , 10)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_4));
            musicNote_4_4.runAction(seq);
        }

    },

    pCallback:function(object){
        //console.log(v);
        this.curCombo = 0;
        var curCombLable = this.getChildByTag(10);
        curCombLable.setString(parseInt(this.curCombo));

        var miss = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_miss.png"));
        miss.setPosition(160, 320);
        miss.setScale(0.2);
        this.addChild(miss);
        var seq = cc.Sequence.create(cc.ScaleTo.create(0.2, 1), cc.CallFunc.create(this.s_pCallback, this, miss));
        miss.runAction(seq);
        object.removeFromParent(true);
    },

    containsTouchLocation:function(touch) {
        if (cc.rectContainsPoint(this.key1Rect, touch)) {
            return 1;
        }
        if (cc.rectContainsPoint(this.key2Rect, touch)) {
            return 2;
        }
        if (cc.rectContainsPoint(this.key3Rect, touch)) {
            return 3;
        }
        if (cc.rectContainsPoint(this.key4Rect, touch)) {
            return 4;
        }
        return 0;
    },

    checkScore:function(pNode) {
        var checkid=0;
        if (pNode == null) {
            return checkid;
        }
        var s_y = pNode.getPosition().y;
        var s_bperfect_maxy = cc.rectGetMaxY(this.bPerfectRect);
        var s_bperfect_miny = cc.rectGetMinY(this.bPerfectRect);
        var s_perfect_maxy = cc.rectGetMaxY(this.perfectRect);
        var s_perfect_miny = cc.rectGetMinY(this.perfectRect);
        var s_great_maxy = cc.rectGetMinY(this.greatRect);
        var s_great_miny = cc.rectGetMinY(this.greatRect);
        if (s_y >= s_bperfect_miny && s_y <= s_bperfect_maxy) { //大perfect
            checkid = 1;
            pNode.removeFromParent(true);
        } else if (s_y >= s_perfect_miny && s_y <= s_perfect_maxy) { //小perfect
            checkid = 2;
            pNode.removeFromParent(true);
        } else if (s_y >= s_great_miny && s_y <= s_great_maxy) { //great
            checkid = 3;
            pNode.removeFromParent(true);
        } else { //miss
            checkid = 0;
        }
        return checkid;
    },

    showCombo:function(id) {
        if (id == 0) {
            return;
        }
        var s_p;
        if (id == 1) {
            s_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_bperfect.png"));
        //if (this->HP < 100) {
         //   this->lastHP = HP;
          //  this->HP += 20;
            this.score += 200;
            this.curCombo++;
        //}
        }
        if (id == 2) {
            s_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_perfect.png"));
            this.score += 183;
            this.curCombo++;
        }
        if (id == 3) {
            s_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_great.png"));
            this.score += 80;
            this.curCombo++;
        }
        if(s_p != null){
            s_p.setPosition(160, 320);
            s_p.setScale(0.2);
            this.addChild(s_p);
            var seq = cc.Sequence.create(cc.ScaleTo.create(0.2, 1), cc.CallFunc.create(this.s_pCallback, this,  s_p));
            s_p.runAction(seq);

            var scoreLable = this.getChildByTag(11);
            if(this.score>9&&this.score<99)
                scoreLable.setPosition(280, 440);
            if(this.score>99&&this.score<999)
                scoreLable.setPosition(260, 440);
            if(this.score>999&&this.score<9999)
                scoreLable.setPosition(240, 440);
            if(this.score>9999&&this.score<99999)
                scoreLable.setPosition(220, 440);
            scoreLable.setString(parseInt(this.score));
        }
        var curCombLable = this.getChildByTag(10);
        curCombLable.setString(parseInt(this.curCombo));
        //if (maxCombo <= curCombo) {
           // maxCombo++;
        //}
        
        /*
        s_p->setScale(0.2);
        this->addChild(s_p, 10);
        s_p->setPosition(
              ccp(origin.x+visibleSize.width/2,origin.y+visibleSize.height/2+80));
    CCCallFuncN* s_pCallBack = CCCallFuncN::create(this,
            callfuncN_selector(Game4Key::remove));
    CCAction* s_pAction = CCSequence::create(CCScaleTo::create(0.2, 1),
            s_pCallBack, NULL);
    s_p->runAction(s_pAction);
    CCLabelBMFont* curCombLable = (CCLabelBMFont*) getChildByTag(10);
    CCLabelAtlas* scoreLable = (CCLabelAtlas*) getChildByTag(11);
    char string[12] = { 0 };
    char strscore[12] = { 0 };
    sprintf(string, "%d", curCombo);
    curCombLable->setString(string);
    sprintf(strscore, "%d", score);
    scoreLable->setString(strscore);
    */
    },
    s_pCallback:function(object){
        object.removeFromParent(true);
    },

});

var Game4KeyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new game4KeyLayer();
        this.addChild(layer);
    }
});