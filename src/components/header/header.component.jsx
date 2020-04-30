import React from 'react';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/original.svg'
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';
import { LogoContainer,OptionLink,OptionsContainer,HeaderContainer } from './header.styles.jsx';


const Header = ({currentUser,hidden}) => (
<HeaderContainer>
<LogoContainer to = "/">
    <Logo className='logo'></Logo>
</LogoContainer>
<OptionsContainer>
    <OptionLink to = "/shop">
    SHOP
    </OptionLink>
    <OptionLink to = "/Contact">
    CONTACT
    </OptionLink>
    {
        currentUser ? 
        <OptionLink onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
        :
        <OptionLink as= 'div' to = "/signin">SIGN IN</OptionLink>
    }

    <CartIcon></CartIcon>
</OptionsContainer>

    {
        hidden ? null : <CartDropdown></CartDropdown>
    
    }
</HeaderContainer>
);

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    hidden: selectCartHidden

})


export default connect(mapStateToProps)(Header);
