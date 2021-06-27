var assert = require('chai').assert;
let aggStats = require('../aggStats');


let d1 =
    [
        {userId: 1, courseId: 1, totalModulesStudied: 3, averageScore: 85, timeStudied: 60*1000*100},
        {userId: 2, courseId: 1, totalModulesStudied: 3, averageScore: 90, timeStudied: 60*1000*20},
        {userId: 3, courseId: 1, totalModulesStudied: 17, averageScore: 87, timeStudied: 60*1000*60},
    ];


    describe('test aggStats function', function() {
        describe('total modules studied in dataset d1', function() {
            it('return value should be an object', function() {
                assert.isObject(aggStats(d1));
              });
              it('should return object with key "totalModulesStudied"', function() {
                assert.property(aggStats(d1), "totalModulesStudied");
              });
              it('should return object with key "averageScore"', function() {
                assert.property(aggStats(d1), "averageScore");
              });
              it('should return object with key "timeStudied"', function() {
                assert.property(aggStats(d1), "timeStudied");
              });
              it('"totalModulesStudied" equal to 23', function() {
                assert.equal(aggStats(d1).totalModulesStudied, 23);
              });

            it('"timeStudied" equal to '+ 60*1000*120 +'(ms)', function() {
                assert.equal(aggStats(d1).timeStudied, 60*1000*180);
            });
            it('"averageScore" equal to '+ parseFloat(((85*3+90*3+87*17)/23).toFixed(1)), function() {
                assert.equal(aggStats(d1).averageScore,  parseFloat(((85*3+90*3+87*17)/23).toFixed(1)));
            });
        });

        
    });

    let d2 =
    [
        {userId: 1, courseId: 1, totalModulesStudied: 8, averageScore: 81.3, timeStudied: 60*1000*83},
        {userId: 2, courseId: 1, totalModulesStudied: 13, averageScore: 76.7, timeStudied: 60*1000*101.1},
        {userId: 3, courseId: 1, totalModulesStudied: 17, averageScore: 90.1, timeStudied: 60*1000*99.333},
    ];

    describe('test aggStats function', function() {
        describe('total modules studied in dataset d2', function() {
            it('return value should be an object', function() {
                assert.isObject(aggStats(d2));
              });
              it('should return object with key "totalModulesStudied"', function() {
                assert.property(aggStats(d2), "totalModulesStudied");
              });
              it('should return object with key "averageScore"', function() {
                assert.property(aggStats(d2), "averageScore");
              });
              it('should return object with key "timeStudied"', function() {
                assert.property(aggStats(d2), "timeStudied");
              });
              it('"totalModulesStudied" equal to 38', function() {
                assert.equal(aggStats(d2).totalModulesStudied, 38);
              });

            it('"timeStudied" equal to '+ 60*1000*(83+101.1+99.333) +'(ms)', function() {
                assert.equal(aggStats(d2).timeStudied, 60*1000*(83+101.1+99.333));
            });
            it('"averageScore" equal to '+ parseFloat(((81.3*8+76.7*13+90.1*17)/38).toFixed(1)), function() {
                assert.equal(aggStats(d2).averageScore,  parseFloat(((81.3*8+76.7*13+90.1*17)/38).toFixed(1)));
            });
        });

        
    });
