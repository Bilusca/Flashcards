import React from 'react';
import { LinearGradient } from 'expo';

export default function PageView({children, style}) {
    return (
        <LinearGradient colors={['#f43b47', '#453a94']} style={[{flex: 1}, style]}>
            {children}
        </LinearGradient>
    )
}