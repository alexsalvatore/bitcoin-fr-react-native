import CustomWebView from './CustomWebView'

export default class Home extends CustomWebView {


    constructor(props){
        super(props);
        this.state = {
            origin : 'https://bitcoin.fr/calendrier/',
            url : 'https://bitcoin.fr/calendrier/',
        }
    }

}