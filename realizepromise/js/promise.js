(function(global) {

  global.Promise = Promise;

  function Promise(callback) {
    if (type(callback) !== "function") {
      throw new TypeError('Promise resolver undefined is not a function');
    }

    var _this = this;
    this.PromiseStatus = 'Pending';
    this.resolve_array = [];
    this.reject_array = [];
    var resolve, reject;
    resolve = function(val) {
      //如果val是Promise
      if (type(val) === 'promise') {
        return val.then(resolve, reject);
      }
      setTimeout(function() {

        if (_this.PromiseStatus === 'Pending') {
          _this.PromiseStatus = 'Resolved';
          _this.val = val;
          _this.resolve_array.forEach(function(item) {
            item(val);
          });
        }
      }, 0);
    };
    reject = function(val) {
      setTimeout(function() {
        if (_this.PromiseStatus === 'Pending') {
          _this.PromiseStatus = 'Rejected';
          _this.val = val;
          _this.reject_array.forEach(function(item) {
            item(val);
          });

        }
      }, 0);
    };

    try {
      callback(resolve, reject);
    } catch (e) {
      reject(e);
    }

  }

  Promise.prototype = {
    then: function(success_callback, failure_callback) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        function success_fun(val) {
          success_callback = type(success_callback) === 'function' ? success_callback : function(value) {
            return value;
          };
          try {
            var result = success_callback(val);
            if (type(result) === 'promise') {
              result.then(resolve, reject);
            }
            resolve(result);

          } catch (e) {
            reject(e);
          }
        }

        function failure_fun(val) {
          failure_callback = type(failure_callback) === 'function' ? failure_callback : function(value) {
            throw value;
          };
          try {
            var result = failure_callback(val);
            if (type(result) === 'promise') {
              result.then(resolve, reject);
            }
            resolve(result);
          } catch (e) {
            reject(e);
          }
        }
        if (_this.PromiseStatus === 'Pending') {
          _this.resolve_array.push(success_fun);
          _this.reject_array.push(failure_fun);

        }
        if (_this.PromiseStatus === 'Resolved') {
          success_fun(_this.val);

        }
        if (_this.PromiseStatus === 'Rejected') {
          failure_fun(_this.val);
        }
      });

    },
    catch: function(failure_callback) {
      this.then(null, failure_callback)
    },
  };

  //类方法，
  Promise.all = function(array) {
    if (type(array) != 'array') {
      throw new TypeError('You must pass an array to all.');
    }
    var arr = array.map(function(item) { //将array中的每一项转为Promise对象
      return Promise.resolve(item);
    });
    return new Promise(function(resolve, reject) {
      var j = 0,
        result = [];
      for (var i = 0; i < arr.length; i++) {
        (function(i) {
          arr[i].then(function(val) {
              result[i] = val;
              if (++j == arr.length) {
                resolve(result);
              }
            },
            function(val) {
              reject(val);
            });
        })(i);
      }
    });
  };

  Promise.race = function(array) {
    if (type(array) != 'array') {
      throw new TypeError('You must pass an array to race.');
    }
    var arr = array.map(function(item) { //将array中的每一项转为Promise对象
      return Promise.resolve(item);
    });
    return new Promise(function(resolve, reject) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].then(function(val) {
            resolve(val);
          },
          function(val) {
            reject(val);
          });
      }
    });

  };



  Promise.resolve = function(obj) {
    var obj_Promise = {};
    //1)参数是一个Promise实例:如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
    if (type(obj) === 'promise') {
      return obj;
    }
    //4)无参数
    if (!obj) {
      obj_Promise = new Promise(function(resolve, reject) {
        resolve();
      });
      return obj_Promise;
    }
    //2)参数是一个thenable对象,thenable对象指的是具有then方法的对象，比如下面这个对象。
    //Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。
    if (obj.then && type(obj.then) === 'function') {
      obj_Promise = new Promise(obj.then);
      return obj_Promise;
    }
    //3)参数不是具有then方法的对象，或根本就不是对象
    //如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。
    if (type(obj) !== 'object' || (type(obj) === 'object' && !(obj.then))) {
      obj_Promise = new Promise(function(resolve, reject) {
        resolve(obj);
      });
      return obj_Promise;
    }
  };

  Promise.reject = function(obj) {
    var obj_Promise = {};
    //1)参数是一个Promise实例:如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
    if (type(obj) === 'promise') {
      return obj;
    }
    //4)无参数
    if (!obj) {
      obj_Promise = new Promise(function(resolve, reject) {
        reject();
      });
      return obj_Promise;
    }
    //2)参数是一个thenable对象,thenable对象指的是具有then方法的对象，比如下面这个对象。
    //Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。
    if (obj.then && type(obj.then) === 'function') {
      obj_Promise = new Promise(obj.then);
      return obj_Promise;
    }
    //3)参数不是具有then方法的对象，或根本就不是对象
    //如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。
    if (type(obj) !== 'object' || (type(obj) === 'object' && !(obj.then))) {
      obj_Promise = new Promise(function(resolve, reject) {
        reject(obj);
      });
      return obj_Promise;
    }

  };


  //辅助方法：
  //判断类型
  var typeArray = {};
  ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object'].forEach(function(val, i) {
    typeArray['[object ' + val + ']'] = val.toLowerCase();
  });

  function type(obj) {
    if (obj == null) {
      return 'null';
    }
    if (obj instanceof Promise) {
      return 'promise';
    }
    return typeof obj == 'object' || typeof obj == 'function' ? typeArray[({}).toString.call(obj)] : typeof obj;

  }

})(window);