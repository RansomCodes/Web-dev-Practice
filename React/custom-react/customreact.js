function customRender(reactElement, mainContainer){
    /*
    const domEle=document.createElement(reactElement.type)
    domEle.innerHTML=reactElement.children
    domEle.setAttribute('href',reactElement.props.href)
    domEle.setAttribute('target',reactElement.props.target)

    mainContainer.appendChild(domEle)
    */

    const domEle=document.createElement(reactElement.type)
    domEle.innerHTML=reactElement.children
    for(const prop in reactElement.props){
        if(prop==='children') continue;
        domEle.setAttribute(prop,reactElement.props[prop])
    }
    mainContainer.appendChild(domEle);
}

const ReactEle={
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click Me to Visit Google'
}

const mainCont=document.querySelector('#root')

customRender(ReactEle,mainCont);