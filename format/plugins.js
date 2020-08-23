/**
 * 强制多属性换行
 * @param {String} str 需要格式化的字符串
 * @param {Number} breakLimitNum 多余这个数量的属性，才会断行
 */

function breakTagAttr(str = '', breakLimitNum = 1, opt = {
    indentSize: 4,
    attrEndWithGt: true,
    tempConf: {}
}) {
    if (breakLimitNum === -1) {
        return str;
    }
    let {
        indentSize,
        attrEndWithGt,
        tempConf
    } = opt;
    let {
        unBreakAttrList
    } = tempConf;
    let padIndent = ' '.repeat(indentSize);
    const TAG_REG = /[\n\r\t]*(\s*)\<[A-z\-\_0-9]+/;
    const TAG_END_REG = /\s*(>|\/>)/;
    const TAG_NAME_REG = /\<([A-z][\w\-]*)/;

    const ATTR_REG = /(\s(\:|\@)?[A-z0-9\-\_\.\:]+(=("[^"]*"|'[^']+'|`[^`]+`|[A-z0-9\_]+))?)/g;
    const TAG_ATTR_REG = new RegExp(TAG_REG.source + ATTR_REG.source + '+' + TAG_END_REG.source, 'g');
    const TAG_CLOSE_REG = new RegExp(TAG_END_REG.source + '$');

    let loop = true;
    while (loop) {
        // 匹配带有属性的 start tag
        let res = TAG_ATTR_REG.exec(str);
        if (res) {
            // 缩进
            let indent = res[1];
            // tag 内容
            let tagContent = res[0];
            let tagName = tagContent.match(TAG_NAME_REG);
            if (unBreakAttrList.includes(tagName[1])) {
                // 行内标签
                continue;
            }
            // console.log(tagContent + '\n\n');
            // 匹配 tagContent 的 attr
            let matchRes = tagContent.match(ATTR_REG);
            // matchRes 处理
            // console.log(matchRes);
            if (matchRes.length > breakLimitNum) { // 一个属性强制断行，或者多属性
                // 每个 attr 先 trim,然后加换行，空格
                let newStr = tagContent.replace(ATTR_REG, (match, $1) => {
                    return '\n' + indent + padIndent + $1.trim();
                });
                // tag 结束括号换行
                newStr = attrEndWithGt ? newStr : newStr.replace(TAG_CLOSE_REG, '\n' + indent + '$1');
                // 替换整个字符串中的对应内容
                str = str.replace(tagContent, newStr);
            }
        } else {
            loop = false;
        }
    }
    return str;
}

module.exports = {
    breakTagAttr
};
