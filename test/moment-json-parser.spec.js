var fs = require('fs');
var json = fs.readFileSync('test/JsonWithDate.json', 'utf8');
var chai = require('chai').should();
var momentJsonParser = require('../moment-json-parser');
var moment = require('moment');

describe('moment-json-parser', function(){
    var parsed;

    before(function() {
        parsed = momentJsonParser(json);
    });

    it('should be able to parse json and return object which has moment instead of date strings', function(){
        moment.isMoment(parsed.entered).should.equal(true);
    });

    it('should not modify classic JSON.parse before calling useMomentParser.overrideDefault', function(){
        var parsedClassic = JSON.parse(json);
        parsedClassic.entered.should.equal('2014-01-01T23:28:56.782Z');
    });

    describe('override', function(){
        before(function() {
            momentJsonParser.overrideDefault();
        });

        it('should now give us moments even when doint JSON.parse', function(){
            var parsed = JSON.parse(json);
            moment.isMoment(parsed.entered).should.equal(true);
        });

        it('should be able to revert back to normal JSON.parse', function() {
            momentJsonParser.overrideDefault(false);
            var parsedClassic = JSON.parse(json);
            parsedClassic.entered.should.equal('2014-01-01T23:28:56.782Z');
        });
    });
    

});