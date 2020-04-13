import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuariosSvc: UsuarioService) {

  }

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(
        () => this.usuariosSvc.getUsers()
          .pipe(
            map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
            catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))
          )
      )
    )
  );

}
