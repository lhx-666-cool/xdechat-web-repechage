function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getUid() {
    return "111";
}

function scrollToBottom(className) {
    const div = document.getElementsByClassName(className)[0];
    div.scrollTop = div.scrollHeight;
}

function scrollToBottomWithAnimation(className, duration = 500) {
    const element = document.getElementsByClassName(className)[0];
    const start = element.scrollTop;
    const end = element.scrollHeight;
    const change = end - start;
    const increment = 20;

    // 当前动画的开始时间
    let startTime;

    // 动画函数
    function animateScroll(timestamp) {
        if (!startTime) startTime = timestamp;
        // 计算动画进度
        const elapsed = timestamp - startTime;
        // 使用easeInOut函数计算当前滚动位置
        const position = easeInOut(elapsed, start, change, duration);

        element.scrollTop = position;

        // 如果动画时间未结束，继续执行动画
        if (elapsed < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            // 确保动画结束时精确设置到底部
            element.scrollTop = end;
        }
    }

    // 缓动函数 - 使用简单的easeInOut公式，使动画更平滑
    function easeInOut(currentTime, start, change, duration) {
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }

    // 开始执行动画
    requestAnimationFrame(animateScroll);
}
export {
    getUid,
    generateRandomString,
    scrollToBottom,
    scrollToBottomWithAnimation
}