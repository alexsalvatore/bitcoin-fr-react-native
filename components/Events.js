import CustomWebView from './CustomWebView'

export default class Home extends CustomWebView {


    constructor(props){
        super(props);
        this.state = {
            url : 'https://bitcoin.fr/calendrier/',
        }
    }

}