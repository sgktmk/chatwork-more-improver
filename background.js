const TOOLBAR_CLASS_NAME         = "sc-iNyZoU fjjiiQ";
const REACTION_BUTTON_INNER_TEXT = 'リアクション';

/**
 * HTMLElement がボタンであるかどうか
 * 
 * @param {*} element 
 * @returns 
 */
function isButton(element) {
    const BUTTON_TAG_NAME = 'BUTTON';
    return element.tagName === BUTTON_TAG_NAME;
}

/**
 * リアクションボタン、ただそれだけをクリックする。
 * 
 * @param {*} _toolbars 
 */
function clickReactionButton(_toolbars) {
    for (const button of _toolbars) {
        if (isButton(button) && button.innerText === REACTION_BUTTON_INNER_TEXT) {
            button.click();
        }
    }
}

/**
 * オブザーバインスタンスを作成
 */
const reactionButtonObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        const _toolbars = mutation.target.getElementsByClassName(TOOLBAR_CLASS_NAME);
        clickReactionButton(_toolbars);
    });
});

/**
 * オブザーバの設定
 */
const config = {
    // 子ノードに対する追加・削除を監視
    childList: true,
    //子孫ノードまで監視
    subtree: true,
}

/**
 * 対象ノードとオブザーバの設定を渡す
 * 
 * @param {*} targets 
 */
function setObserber(targets) {
    for (const target of targets) { 
        reactionButtonObserver.observe (target, config);
    }
}

/**
 * ちょっぴり悔しいけど、1秒おきに監視する。
 * 
 * @param {*} targets 
 */
function polling(targets) {
    window.setInterval(() => {
        setObserber(targets);
    }, 1000)
}

/**
 * ページのロード後にポーリング処理を開始する。
 */
window.addEventListener('load', () => {
    // 対象とするノードを取得
    const targets = document.getElementsByClassName('_message');
    polling(targets);
}, false);
