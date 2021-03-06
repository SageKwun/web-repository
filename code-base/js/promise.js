(function (window) {
  const PENDING = "pending";
  const RESOLVED = "resolved"; //官方为fulfilled
  const REJECTED = "rejected";

  /**
   * Promise的构造器函数
   * @param executor 同步执行器函数
   * @constructor
   */
  function Promise(executor) {
    const self = this; //记录this对象,避免在后面的函数中this变window对象

    self.status = PENDING; //当前状态,初始值为pending
    self.data = undefined; //存储结果
    self.callbacks = []; // 回调函数, 结构为{ onResolved() {}, onRejected() {}}

    function resolve(value) {
      //resolve函数直接调用,函数内的this会变成window,所以上面会用self保存了this
      //如果当前不是pending状态,直接结束
      if (self.status !== PENDING) return;

      //修改状态
      self.status = RESOLVED;
      //保存数据
      self.data = value;
      // 第一个Promise的callbacks中没有内容，以下发生在在then()中传递的Promise
      // 如果callbacks中有回调函数,立即加入到回调队里中
      // promise的回调属于微队列任务,这里用宏队列的setTimeout模拟
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach((callbackedObj) => {
            callbackedObj.onResolved(value);
          });
        }, 0);
      }
    }

    //和resolve函数几乎一样
    function reject(reason) {
      if (self.status !== PENDING) return;

      self.status = REJECTED;
      self.data = reason;

      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach((callbackObj) => {
            callbackObj.onRejected(reason);
          });
        }, 0);
      }
    }

    //立即同步执行executor
    //如果throw异常,promise失败
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * @description Promise原型对象的then()
   * @param onResolved 成功回调
   * @param onRejected 失败回调
   * @return Promise
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    //向后传递成功的结果
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    //向后传递失败的结果
    //指定默认的失败回调,此处是实现异常穿透的关键点
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const self = this; // 这里的this还是原来的Promise

    //返回一个新的promise对象
    return new Promise((resolve, reject) => {
      /**
       * @description 调用指定的回调函数,根据回调函数的执行结果,改变return的promise的状态
       * @param {function} callback
       */
      function handle(callback) {
        /*
         * 1. 如果抛出异常, return的promise就会失败, reason就是error
         * 2. 如果回调函数返回不是promise, return的promise就会成功, value就是返回的值
         * 3. 如果回调函数返回是promise, return的promise结果就是这个promise的结果
         */
        try {
          const result = callback(self.data);
          if (result instanceof Promise) {
            //3.如果回调函数返回是promise, return的promise结果就是这个promise的结果
            //简写方式
            //result.then(resolve, reject)
            result.then(
              // 当result成功时,return的promise成功
              (value) => resolve(value),
              // 当result失败时,return的promise失败
              (reason) => reject(reason)
            );
          } else {
            //2. 如果回调函数返回不是promise, return的promise就会成功, value就是返回的值
            resolve(result);
          }
        } catch (error) {
          //1. 如果抛出异常, return的promise就会失败, reason就是error
          reject(error);
        }
      }

      if (self.status === PENDING) {
        //resovle/reject 已经将回调放入队列中了
        self.callbacks.push({
          onResolved() {
            handle(onResolved);
          },
          onRejected() {
            handle(onRejected);
          },
        });
      } else if (self.status === RESOLVED) {
        //如果当前是resolved状态, 异步执行onResolved并改变return的promise状态
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        //如果当前是rejected状态, 异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  };

  /**
   * Promise原型对象的catch()
   * @param onRejected 失败回调
   * @return Promise
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  //向外暴露Promise
  window.Promise = Promise;
})(window);
