let HIDDEN_CLASS_NAME = "hidden";
let TARGET_CLASS_NAME = "target";
let SOURCE_CLASS_NAME = "source";

let targetIdToShow = 1;

function main() {

    let targets = getElements(TARGET_CLASS_NAME);
    let sources = getElements(SOURCE_CLASS_NAME);
    sources.forEach((sourceNode) => {
        let sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME);
        sourceNode.addEventListener("click", () => {
            showTarget(targets, sourceNodeId);
        })
    })
    showTarget(targets, targetIdToShow);
}

function getElements(type) {
    return [].slice.call(document.querySelectorAll("." + type)).sort((targetNode1, targetNode2) => {
        let target1Num = extractId(targetNode1, TARGET_CLASS_NAME);
        let target2Num = extractId(targetNode2, TARGET_CLASS_NAME);
        return target1Num > target2Num;
    })
}

function extractId(targetNode, baseClass) {
    let currentClassIndex = targetNode.classList.length;
    while (currentClassIndex--) {
        let currentClass = targetNode.classList.item(currentClassIndex);
        let maybeIdNum = parseInt(currentClass.split("-")[1]);
        if (isNaN(maybeIdNum)) {
            continue
        }
        let classStringToValidate = baseClass + "-" + maybeIdNum;
        if (classStringToValidate === currentClass) {
            return maybeIdNum;
        }
    }
}

function showTarget(targets, targetId) {
    targets.forEach((targetNode, targetIndex) => {
        let currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME);
        if (currentTargetNodeId === targetId) {
            targetNode.classList.remove(HIDDEN_CLASS_NAME);
        } else {
            targetNode.classList.add(HIDDEN_CLASS_NAME);
        }
    })
}

main();

// настройка для планшетных и мобильных устройств
let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if (width < 769) {
    document.querySelectorAll('.employee__wrap').forEach(n => n.classList.remove('hidden'));
}

// обновление страницы при развороте экрана
window.addEventListener("orientationchange", () => {
    window.location.reload();
})


let EXPAND_CLASS_NAME = "expand";
let DOTS_CLASS_NAME = "dots";
let MORE_CLASS_NAME = "more";

function showMore() {
    let expand = document.getElementsByClassName(EXPAND_CLASS_NAME);
    let more = document.getElementsByClassName(MORE_CLASS_NAME);
    let dots = document.getElementsByClassName(DOTS_CLASS_NAME);

    [].forEach.call(expand, (expandBtn) => {
        let expandBtnId = extractId(expandBtn, EXPAND_CLASS_NAME);
        expandBtn.addEventListener("click", () => {
            showTargetMore(more, expandBtnId);
            showTargetBtn(expand, expandBtnId);
            showTargetDots(dots, expandBtnId);
        })
    })

    function showTargetMore(more, moreId) {
        [].forEach.call(more, (moreText) => {
            let currentMoreTextId = extractId(moreText, MORE_CLASS_NAME);
            if (currentMoreTextId === moreId) {
                if (moreText.style.display === "none" || moreText.style.display === "") {
                    moreText.style.display = "inline";
                } else {
                    moreText.style.display = "none";
                }
            } else {
                moreText.style.display = "none";
            }
        })
    }

    function showTargetBtn(expand, expandId) {
        [].forEach.call(expand, (btn) => {
            let currentExpandId = extractId(btn, EXPAND_CLASS_NAME);
            if (currentExpandId === expandId) {
                if (btn.innerText === "Подробнее") {
                    btn.innerText = "Скрыть";
                    btn.style.backgroundImage = "url('images/icon-next-up.png')";
                } else {
                    btn.innerText = "Подробнее";
                    btn.style.backgroundImage = "url('images/icon-next-down.png')";
                }
            } else {
                btn.innerText = "Подробнее";
                btn.style.backgroundImage = "url('images/icon-next-down.png')";
            }
        })
    }

    function showTargetDots(dots, dotsId) {
        [].forEach.call(dots, (dots) => {
            let currentDotsId = extractId(dots, DOTS_CLASS_NAME);
            if (currentDotsId === dotsId) {
                if (dots.style.display === "inline" || dots.style.display === "") {
                    dots.style.display = "none";
                } else {
                    dots.style.display = "inline";
                }
            } else {
                dots.style.display = "inline";
            }
        })
    }
}

showMore();