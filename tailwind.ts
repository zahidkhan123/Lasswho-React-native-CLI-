import { create } from 'tailwind-rn';
import styles from './styles.json';

// type Keys = keyof typeof styles;

// const tw = (key: Keys) => JSON[key];

const { tailwind, getColor } = create(styles);
export { tailwind, getColor };
