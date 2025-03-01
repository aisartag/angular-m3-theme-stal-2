import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const overAnimations: {
  readonly transformOver: AnimationTriggerMetadata;
} = {
  transformOver: trigger('transformOver', [
    state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
    transition(
      'void => enter',
      animate(
        '120ms cubic-bezier(0, 0, 0.2, 1)',
        style({ opacity: 1, transform: 'scale(1)' })
      )
    ),
  ]),
};
