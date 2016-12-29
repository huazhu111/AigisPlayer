var exp = {
    expList : [
        0,16,43,113,225,470,750,1100,1520,2010,
        2570,3200,390,467,5510,6420,7400,8450,9570,10760,
        12020,13350,14750,16220,17760,19370,21050,22800,24620,26510,
        28470,30500,32600,34770,37010,39320,41700,44150,46670,49260,
        51920,54650,57450,60320,63260,66270,69350,72500,75720,79010,
        82370,85800,89300,92870,96510,100220,104000,107850,111770,115760,
        119820,123950,128150,132420,136760,141170,145650,150200,154820,159510,
        164270,169100,174000,178970,184010,189120,194300,199550,204870,210260,
        215720,221250,226850,232520,238260,244070,249950,255900,261920,268010,
        274170,280400,286700,293070,299510,306020,312600,319250,325970,332760,
        339620,348538,357589,366775,376098,385560,395163,404910,414803,424844,
        435035,445378,455875,466529,477343,488319,499459,510766,522242,533890,
        545712,557711,569888,582247,594792,607525,620447,633563,646875,660386,
        674099,688016,702414,716478,731030,745800,760791,776006,791449,807123,
        823032,839179,855568,872202,889085,906221,923614,941267,959184,977369,
        995826,1014559,1033572,1052870,1072457,1092337,1112515,1132995,1153782,1174880,
        1196294,1218028,1240089,1262480,1285206,1308272,1331683,1355445,1379563,1404042,
        1428888,1454106,1479702,1505681,1532049,1558812,1585976,1613547,1641531,1669934,
        1698763,1728024,1757723,1787867,1818463,1849517,1881036,1913027,1945497,1978454,
        2011905,2045857,2080318,2115295,2150796,2186829,2223402,2260523,2298200,2336442,
        2375257],
    getRank : function(exp){
        if(exp < 2375257){
            for(let i = 0;i<this.expList.length;i++){
                if(exp > this.expList[i] && exp < this.expList[i+1]) return i+1;
            }
        }
        else{
            return marh.max(400,parseInt((exp - 2375257)/40000) + 201);
        }
    },
    getCharisma : function(rank){
        if(rank < 101) return 3 * rank + 27;
        else{
            return 328 + (rank - 101);
        }
    },
    getStamina : function(rank){
        if(rank >= 200) return 18;
        if(rank >= 180) return 17;
        if(rank >= 160) return 16;
        if(rank >= 140) return 15;
        if(rank >= 120) return 14;
        if(rank >= 101) return 13;
        return 12;
    }
}

module.exports = exp;