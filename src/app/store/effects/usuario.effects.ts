import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';
import { cargarUsuarioError, cargarUsuarioSuccess, cargarUsuario } from '../actions';

@Injectable()
export class UsuarioEffect {

  constructor(
    private actions$: Actions,
    private usuariosSvc: UsuarioService) {

  }

  cargarusuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarUsuario),
      mergeMap(
        (action) => this.usuariosSvc.getUserById(action.id)
          .pipe(
            map(user => cargarUsuarioSuccess({ usuario: user })),
            catchError(err => of(cargarUsuarioError({ payload: err })))
          )
      )
    )
  );

}
