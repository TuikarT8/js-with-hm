import { menu } from './menu';
import $ from 'jquery';
import { components } from './component';
import { game } from './game';
import './index.scss';

$(() => {
    components();
    menu();
    game();
});
