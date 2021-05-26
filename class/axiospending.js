/* 将请求添加到pendingAjax */
export class addPendingAjax {
    constructor(config, pendingAjax) {
        //生成重复标识的方式
        const duplicatedKey = JSON.stringify({
            duplicatedKey: `${config.method}${config.url}`,
            type: config.method
        });
        //如果pendingAjax中不存在当前请求，添加进去
        if (duplicatedKey && !pendingAjax.has(duplicatedKey)) {
            pendingAjax.set(duplicatedKey, config.method);
            console.log("准备插入要取消的请求", pendingAjax);
            return {
                duplicatedKey,
                pendingAjax
            }
        }
    }
}
/* 将请求完成后到接口从pendingAjax移除 */
export class removePendingAjax {
    constructor(config, pendingAjax) {
        //生成重复标识的方式
        const duplicatedKey = JSON.stringify({
            duplicatedKey: `${config.method}${config.url}`,
            type: config.method
        });
        //如果pendingAjax中存在当前请求, 取消当前请求并将其删除
        if (duplicatedKey && pendingAjax.has(duplicatedKey) && config.params.isHmr) {
            config.isHmr = true;
        } else {
            config.isHmr = false;
        }
    }
}