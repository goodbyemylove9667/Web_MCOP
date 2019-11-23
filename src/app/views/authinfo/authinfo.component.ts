import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authinfo',
  templateUrl: './authinfo.component.html',
  styleUrls: ['./authinfo.component.scss']
})
export class AuthinfoComponent implements OnInit {

  key: string;
  user :any;
  loading=false;
  constructor(private firebase: AngularFireDatabase,private toastr: ToastrService,public router: Router) { }

 async ngOnInit() {
   this.loading=true;
  var email= await JSON.parse(localStorage.getItem("email"));
  this.user = {
    Id:'',
    Email: '',
    Password: 'abc123',
    Firstname : '',
    Lastname : '',
    Phone : '' ,
    Address : '',
    Birthday : new Date() ,
    Image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAACFtgAAhbYBqbnzzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAADHwSURBVHja7d13fNXV/cfxAoqjQtX6q7baOlprbf11aFWs3e1PrdbaWhmCKIQpQ2ULiBJCGGEjQ4ZsFVGmDJlZZJAEQpgJZO+JgmwC/D6nfrURM25u7vfe7/me1x/Px8NHpZic7znn877fe8Y3Ll68+A0AztWyw/Cm4hbxM/Eb8ZhoLbqKASJETBULxSoRLnaKVHFYZIhskSvyRZEoEeXiiDgqPhMnLGXWn98vEqy/b61YJuaLaWKseF30s36Of4oW4jZxJc8NcD4aAQhscb9K/Ej8UTwnXrUKrCrkSaJYXBAXNfOpFUAixFIx2frdOlgB5hfiGvoAQAAA3FzkrxcPi85igvhI7LY+gV80nHobESXetgLCv8XPxdX0HYAAAOhS6G8WfxW9xQzr1XkxRd4rF6yvK1QbzhYDxZPqqxD6GkAAAAJV6JuIX1rffatPrjus79Ep3P6h1i9sEKHWG4Pb6JcAAQCwo+D/QDwjxlmvq09QhB2nQmyxFieqBZJ3ikb0X4AAAHha7JuLP4vB1kK8IoqrttRbmY+ttQUPicvp4wABAPii4F9hFfxR1pa38xRO1zouNokh1qJMAgEIAIBBBb+RuNdaVKaKwUkKo7FOWF8bvCZ+p85bYIyAAAC4q+jfLrpYB9mw9Q41UWFwo+glbmXsgAAA6LlK/4/W6XgZFDZ4KcU6ZfEBFhSCAAA4+7v8J6xteWUUL9hwYNEc6yyCqxhzIAAAgS36zawtX+qo2WMUKfjxq4I11smONzIWQQAA/FP0bxBB1uU0pylGCLBKa6the+42AAEA8H3Rv9L6pL/BmnApPHDqroL3xN/ZYggCANCwwv+gmCk+obhAM2odynR1fTNjGQQAwLOif7N1cttBighcIlOMFHczxkEAAL7+ir+N9V0qJ/HBzeLF82rXCmMfBACYXPjvsV7xf0phgIFfEaiLi25nLgABAKYU/cbiH2IrRQD4zxuvddYZFo2ZI0AAgBsL/7dEH07mA2pdKzBIbXVlzgABAG4o/HeJaeIzJnjAI+p8i0VqFwxzCAgA0K3oqxv3/mbt27/AhA54LVI8yrwCAgCcXvgvt27dS2PiBnxqp3iGdQIgAMBphV9dxPOiyGGiBmyVKjpy0iAIAHDC/v3eIp+JGfCrXPGSuJq5CAQA+LPwX22t6C9iIgYCqlQMVbtsmJtAAICdhf8aMVCUMPECjnJUvM6NhCAAwNeFv5kYIsqZaAFHK7G+lmvK3AUCABpS+C8TPfjED2h5qFA7tSWXuQwEANS3+D9lrThmMgX0tVs8zpwGAgA8Kfz3W4ePMHkC7jpQ6CHmOBAAUF3hv128x8l9gKutFD9lzgMBAKrwXyfGizNMjoARKsWb4lrmQAIAzD22t684woQIGHuGQEcWChIAYFbx/73YzwQIQMSJe5kbCQBwd+G/Qczje34AlzgvZorrmSsJAHDf9bwdOcgHQB3KrRs9uXWQAAAXFP+fiigmNgD1kCAeYA4lAEDPwn+VGCXOMpkB8IL6qvAt0Zw5lQAAfYr/36yjQJnEAPji6uFHmVsJAHB24f+2WMqEBcAGb3PtMAEAziz+T4giJikANsrnbgECAJx1Ve8cJiYAfrRAnSLKHEwAQGAP9OG7fgCBUCieZC4mAMC/hf8K6/z+80xCAAJsCQcIEQDgn+J/L8f4AnAYtf7or8zRBADYU/gvE8PY1w/AwccJh4omzNkEAPiu+N8q4plgAGhgu/g+czcBAA0v/k+25MpeAHqpEE8xhxMA4P0r/zBu7gOgsSmiKXM6AQCeF/+bRTSTBwAX2Cl+xNxOAEDdxf8RUcqkAcBFjom2zPEEAFRf+BuLYPb2A3CxueocE+Z8AgD+W/xvFFuZHAAYQO1o+i5zPwGA4v/5cb6FTAoADFIg7qcGEABMLv5dONgHgKFOifbUAgKAaYW/iZjEBAAAw8epNVDUBgKACcW/uVjPoAeAL20Q11IjCABuLv53cJEPAFQrTdxFrSAAuHWxXzmDHABq9Kl4nJpBAHBT8e/EYj8A8Ig6C+UVagcBwA2H+0xgQAOAV4sDG1FLCAA6Fv9vinUMYgDw2jvicmoKAUCn4v9t67QrBjAANMxm0YzaQgDQofjfwkp/APCpZHETNYYA4OTif5fIYbACgM9liR9TawgATiz+97XkGl8AsJPaSt2CmkMAcFLx/3PLz++7ZoACgL1OiL9TewgATij+T4vTDEoA8JtK0YEaRAAIZPHvbHVEBiQA+NcF0YVaRAAIRPEfxAAEgICHgO7UJAKAP4v/MAYeADhGL2oTAcAfxX8Igw0AHOdlahQBwM7iP5BBBgCO1Y9aRQCwo/j3Y3ABgOMNpGYRAHxZ/F9mUAGANoZQuwgAvij+vRhMcLgzrToGH2kdNKKgbeeQ9PbdR+0L6jV2V7c+E+J7D5q6fcAbb0UOGz0vYtSkd8Inz/owYvaitVFLPtwcs2J99A5F/bP639S/U39G/Vn1/1H/X/V3qL9L/Z3q71b/DfXfUv9N2h0ON4waRgBoSPHvziBCoE89a9d1ZFrPAZNjQycuCX9n+ZaYmMR9B/cdyipIzyk4kldSeqaovOJiIKj/tvoZ1M+ifib1s8nPGKF+VvUzy89+kueHABtELSMAeFP8u1h7TBlEsF3roOCijj3H7ho4fFbktLkrI9ZtiU/cm5aZX1hWcSFQBb6h1M+ufoe1m+OS1O8kv1uU/I7J8rsW88zhR52paQSA+hT/DhR/2OR0UK+wpJDxi7ct/mDT9u2Je/dn5Rd9pmuR95b6nbcn7D0gbRATMn5RhLTJLr5WgI3HBj9NbSMAeFL8/87xvvClNp1G5AwKnhW+6uPtO3IKS46bVuw9lV1YfGLVhu2J6k2BtFkefQe+DN7iz9Q4AkBtxb9Fy89vmmLAoCFOdn5pXMK0uSvDk/cfzqS4e2fXvkPZb85ZESVtmSRteop+hQZSN7beR60jAFRX/H/c8vO7phkoqLdnO4VkDg6ZE752c1xCblHJSQq4b0mbnlqzMXbn4BFzItt0Csmmz8FLpeIuah4BoGrxv0lkMThQv1f7IZlTZ68I33MwI4ci7V+7D6TnTZm9PIowAC/kiFuofQQAVfybiWQGBTwV1CsscfXHMfGFZRXnKcaB3mlQfmHVhu0J6qwC+ibqYb/4NgHA7OJ/udjMYIAn+/H7DZsZkZiSmkrhdaaE3amH+g2bEcX5A/BQvPgmAcDM4t9IvMMgQB378wvGTXt/S3puQRlFVg/pOQXl46Yt3aaeHX0YdVgnGhMAzAsA4+j8qEn77qN2v7dya1RBafkZiqqeCkrLzr63Ymu0PMsU+jRqMYEAYFbxf4VOjxoKf0pUfEoyBdRd1DMlCKAWnQgAZhT/x8V5Ojwu8enM+au3FZZVVFIw3bpgsKJSPWP1rOnvuMRZ8XsCgLuL/10MflyqR//J21MzcosokmZQz1o9c/o+LqHOgbmDAODO4n+tSKOT48t9/EEjcj/aFBtPUTSTevaqDzAWcMn2wOYEAHcV/8ZiA50blnNvjJkfzrn8UH1A9QXVJxgXsKwXTQgArPiHyzzffdTeHckH0ih+qEr1CdU3GCOwTCIAuKP4t6czQxk5YXG4uqOegocaFgleCJ24OJyxAksXAoDexf9+bhGDOLNo2cYoihw8sfD9jWqB4BnGDTsD3L4zwM3F/7uCk8AM16pj8JHNUUm7KGyoj82RScnSdz5hDBmvUNxIANCr+F9hnfNMBzb6tr4RWbv2HU6noMEbO/ceypQ+lMNYMt5Wtx4X7NYAMJdOa/hivxdH70rP4fx+NMzh7Pxy6Ut7GFPGCyYA6FH829JZzdZzwJSIvJLSkxQw+EJuUcmpngMmxzC2jKZOj32EAODs4v8jcYzOaq7hYxd8LJP2eQoXfL1D4PXPzwtgnJmrVNxMAHBm8W8qdtJJzdX3tRmbKVawU5+h0zlC2GzR4jICgPMCwBQ6p7mCeoXt4Ope2C2/pOxcx15jkxlzRgsjADir+D9FpzRX284haVn5RUcoUPCHjLzCo892Dslk7BnrgniSAOCM4v99UUGnNHaff8netMwsChP8KeVgRr70vXLGoLGOiFsJAIEt/k0E38mZ60T0jj27KUgIhPDY5AOcNGq0eN3XA+geAELphOZuy/lgTUQ0hQiBtHTVtgTrlTBj0kzDCACBKf5/tfZm0gkNFPbmUlb8wxHGTHk3mjFp9H0B9xIA/Fv8rxdFdD4zte82KqWwrLyS4gMnKCgtPy99MpWxaaz96vh5AoD/AsASOp25N/sl7D54gMIDJ4nbuT9d+uY5xqexxhMA/FP8n6SzmWvE+EW8+ocjBYct5KsAs48K/j0BwN7if511PSMdzkDPdgpJ54x/OPjOgDPSR7k90FzqbIhmBAD7AsACOpm5h29sid6ZRKGBk20MT9jLWDXaHAKAPcX/cTqXufoPm7mNAgMd9H1tRixj1mhPEAB8W/y/JfLpWMae9leUyVG/0ER6bsEx6bNljF1jqR1q3yYA+C4AvE2nMtfU2cu3UFigk0lvfcAJpWZbSgDwTfF/lM5k9Kf/ipzC4mMUFegkK7/opPTdo4xhoz1GAGhY8W8uculI5ho5YTHb/qClEeMWsS3QbBniKgKA9wHgLTqR2Zf9HM7JL6GYQEepmbnqxrjTjGOjjSQAeFf8H+CSDbMNCp61lUICnQ18460YxrLZJ5eKnxAA6lf8G4sEOo/Rzu1NzcykiEBnyfsP53NpmfG2EQDqFwC60GnM1mvglEgKCNyg54DJOxjTxmtPAPD8pr9yOozZNkclJVI84AYfhyfsYUwbr0QdZU8AqDsAzKSzGL/1r5jrfuGm64KlT/OhBm8RAGov/vfyfRkGDp8VTuGAyxYDcjAQ1KL2FgSA6ot/IxFHJ8HmqKSdFA246pKgiMQUxjbEbtGEAPD1ABBE50CrjsElvP6HS78G4H4AKD0IAF8t/teKUjoGBg6fFUHBgCu/Bhg+K4oxDqvWNScA/DcAvEmnwH9e/0cmJVMs4EabIhN3M8ZhGUUA+Lz4/1RU0iGgjv4tKC07R7GAO78GKDun+jjjHOKU+D4BoMPwlXQGKB16juHTP1ytQ48xLAbEFxYZHQCkAR6iE+ALwWELt1Ek4GbDxy6IZKyjyrbAe00OAAwGfGnVhu1xFAm42Yp1UUmMdTjlnoBAFv/HefiomobTcwpKKRJws7Ss3E8Y67jE340KANahP6yIxZfadBqRQYGACaSv5zHmUcUBcZlJAaAdDx1V9R40ldv/YIReA6dwOyAu9aIRAUB+0aYikweOqkZNemczxQEmGDlhcTRjHtXcFtjMhADQm4eNSy1atokTAGGE+e9tiGfMoxpDXB0A5Be8xko6PGx8RXhsMhcAwQibo5L2M+ZRDXVl9DVuDgCv85BRnbTM3HyKA0yw71BWOWMeNRjoygAgv9i3xFEeMKrxmUyM5ykOMEFhWbnq82cY96hhLcDVbgwAQ3i4qGELYDqFAYZtBcxn7KMGfVwVAFSi4bpf1KRtl5EHKAowifR5dkKhJkXiSjcFgJd4qKhJ++6jdlMUYJL23UalMvZRi96uCADyi1wucnmgqPEWwB5jkigKMMkLPcbsY+yjFuoroivcEAA68jBRm069w+IpCjBJUO8wjkJHwE8HtLv4Nxa86kKtuvWZEENRgEm6vjJhJ2MfdchRb9B1DgDP8BBRl54DpkRRFGCSHgMmJzD24YEuOgcAUi7q9MqQaeEUBZjk5cFvxjH24QH1Br2RdgFAfuhHeXjwxIA33tpGUYBJ+g+bGcvYh4ce0zEARPLg4Im+r83gDQCM0mfo9BjGPjy0TqsAID/wgzw0eKp734mxFAWYRPo8awDgqQviTp0CwCIeGjw+B6DnmGSKAkzSoceYFMY+6mGKFgFAftAbxGkeGDzVrmvoQYoCTCJ9nu3RqA91kV4zHQLAIB4W6hcARqZRFGBWABiZxthHoI8HtuPgHy65AAEAIADAt9J8vSXQ1wHgCR4SCAAAAQDO3xLo6wCwjgcEAgBAAIAt1jsyAMgPdrs4zwMCAQAgAMC2LYE/dmIAGMvDAQEAIADAVpMcFQDkB7pClPFgQAAACACwVZmvbgn0VQB4nocCAgBAAIBfPO2kABDPAwEBACAAwC/WOCIAyA9yNw8DBACAAAC/OSdudEIAGMnDAAEAIADAr/o5IQBw8h8IAAABAP61L6ABQH6A3/AQQAAACAAIiF8HMgBM5wGAAAAQABAQ0wMSANQ+RPb+gwAAEAAQMEfUOTyBCAB/p/FBAAAIAAioVoEIAO/R8CAAAAQA6HlBkLfF/xpxgoYHAQAgACCgKsUN/gwA7Wl0EAAAAgAcIcifAeBjGhwEAIAAAEdY65cAoI4ftF450OggAAAEAATeadHMHwGgM40NAgBAAICjtPZHAFhDQ4MAABAA4ChLbQ0A8h+4SpykoUEAAAgAcJRj9T0UqL4B4EkaGQQAgAAAR3rCzgAwhwYGAQAgAMCR3rYlAMhf3EgU0cAgAAAEADiSup+niR0B4AEaFwQAgAAAR/ujHQEghIYFAQAgAMDRptoRAFJoWBAAAAIAHC3DpwFA/sJbaVQQAAACALRwuy8DQC8aFAQAgAAALXTxZQDYSIOCAAAQAKCFZT4JAPIXNeX0PxAAAAIAtFGutu77IgD8jsYEAQAgAEAr9/oiALxGQ4IAABAAoJWBvggAW2hIEAAAAgC0sqlBAUD+gsvFCRoSBACAAACtqLV7VzQkADxMI4IAABAAoKU/NyQADKEBQQAACADQ0qiGBIBNNCAIAAABAFpK8CoAWN//H6cBQQAACADQ0nnRzJsA8BCNBwIAQACAO9cB1BYAXqXhQAAACADQ2qveBICPaTgQAAACALS2ol4BQJ0hLI7ScCAAAAQAaC2/vgHgThoNBACAAABX+F59AkBrGgwEAIAAAFf4Z30CwFgaDP4LAKEHKQowKwCEHmTsw49G1ycAcAEQ/OXM+q07kigKMInq86rvM/7hJ1vrEwAqaDD445CKd1ds3U5BgIlU37cOamEugN3Uov5GdQYA+UO30Vjwh+lvr9pGIYDJ1BhgLoCf3O1JAPg3DQW7BYct3EIBACr+MxaYE+AHL3gSAEJpKNipbZeRaQWl5eeY/IGKi2osyJg4xNwAm033JABsoKFgowtboney6A+oYnNUUjJzA2wW6UkAKKGhYJfeg6ZGMOEDX9dr4JQY5gjYqLTWACB/4BYaCXauRE3NzC1gsge+7mB6TnFLrmCHvb5dWwB4kgaCXULGL9rERA/UuiAwirkCNvptbQFgIA0Eu+zce+gAkzxQsx3JBzKZK2CjLrUFgNk0EGxa+c9xv4AH2nYOyWLOgE0m1hYAwmkg2GHMlHc3M7kDdRs16Z1o5gzYZENtASCfBoIdkvcf5sY/wAOJKak5zBmwSXa1AUD+xdVqjzYNBF9r02lEBhM74DkZMwXMHbDjHBbxzeoCwM9pHNghqFdYApM64LmOvcamMHfAJvdVFwC4AwC26DN0Oof/APXwypBpHAoEuzxXXQB4lYaBHUZOWMytf0A9hIxfFMncAZuEVhcA3qZhYIc5i9dGMqkDnpu96CN2AsAuH1QXADiBCrZYszGWNQBAPazZGJPI3AGbxFcXAIpoGNhhU2TibiZ1wHNqzDB3wCb5XwkA8j9cQ6OAAAAQAOB6laJJ1QDwCxoFBACAAAAj3FI1ADxGg4AAABAAYIQWVQNABxoEBACAAAAjPFM1AHAGAAgAAAEAZnilagCYTIOAAAAQAGCE8VUDwFIaBAQAgAAAIyytGgAiaBAQAAACAIywvWoASKVBQAAACAAwQnbVAPApDQICAEAAgBHOisaq+F9JY4AAABAAYJQbVAC4jYYAAQAgAMAoP1IBoAUNAQIAQACAUe5TAeCfNAQIAAABAEb5swoAXWkIEAAAAgCM8rQKAP1oCBAAAAIAjNJRBYDXaQgQAAACAIzSRwWAsTQECAAAAQBGGa4CwDQaAgQAgAAAo0xSAWA+DQECAEAAgFHmqwCwjIYAAQAgAMAoK1QAWEtDgAAAEABglG0qAITTECAAAAQAGGWnCgAJNAQIAAABAEZJVQFgPw0BAgBAAIBRDqkAkE1DgAAAEABglHQVAMpoCBAAAAIAjJKpAsAJGgIEAIAAAKNkEQBAAAAIADBPjgoAR2kIEAAAAgCMkqcCwBEaAgQAgAAAoxSwCBAEAIAAAPMUqQBQTEOAAAAQAGCUYhUACmgI2Gnl+ugdTOqA5z7aFJvE3AGblaoAkENDwE5vzl0ZwaQOeG7h+xtjmDtgs3IVADJpCNhpSMjccCZ1wHMTZ34QxdwBmx1RAeAwDQE7dX1lQhyTOuC5YaPnRTN3wGYVKgCk0hCwU9suI1OZ1AHP9eg/OZG5AzbL5TZA+MMxmdQuMLEDdSssq7jYqmNwOfMGbHZQBYAUGgJ2O5iRk8vkDtQtYXcqN7TCHxJVANhFQ8BuE2cs28LkDtRtxrzVfP8PfwhXAYDvmmC7Np1GZBaWVZxnggdq1/nlcZwBAH9YqwJALA0Bf1i/dUc8EzxQs137DqtzWS4wX8APlqoAsIGGgD907zsxhkkeqNmrwbPZ/w9/masCwLs0BPzk3MGMnAImeuDrMvIKj8kYOcE8AT+ZogLANBoC/hIctmArkz3A4T8IuFAVAEJoCPjzLcC2mOQUJnzgv7Yn7j0kY6OS+QF+NFgFgL40BPypddCI/IzcgiNM/EDFxYLSssp2XUMPMTfAz15SAaADDQF/69Z3IjsCADFywmJe/SMQglQAeIqGQCDMmLeKa4JhtPnvfcw2bARKKxUAfkdDIEBOR8Tt3kshgInWbo7bqdbEMA8gQB5XAeAeGgIBdHLpym2xFASYZFNk4m7p+8cZ/wig+1UAuJmGQIBdCJ24JLywjBsD4X4z56+O4ZM/HOAWFQCuoiHgBD36T47NLSo5SZGAG+WXlFb2f31mHGMdTvjQJS77xsWLF1UIOE2DwAme6xZ6ICu/6DMKBtxkw7Yde9t2GZnFGIdDlKja/0UAKKRB4BTvrw5nTQBcYd+hrKIe/SfvYFzDYXZXDQD7aRA4Rd+h06MoHtDZ5qide3sPmhrL21U41IaqASCCBoFzTgoMLqKIQEerNmzf+WznkGzGMRzu7aoBYAENAifZsftgGgUFumnXdSRH+kIHI6sGgDdoEDjJxJkfhFNQoJP45APpjF1oomfVAPA8DQIn6dhz7E6KCnTy+uj5kYxdaOJfVQPA72kQOMyZ7MJitgNCC4Vl5edbBwUXM26hiRZVA8D3aRA4zcr10XEUF2iyzz+ZMQuN3Fo1ADQWZ2kUOMnAN97itkBo4eXB07YzZqGRpl8GACsEsIAFjtImaEQOxQVOl1NYcrIlF/tAH+Vf1P2qAWAzDQOn2bXvcDpFBk625MPNMYxVaCSxugAwh4aB07w5d8U2igycrPNL45IYq9DI4uoCwBAaBk4jk+sOigycKi0zt1T6aSVjFRoZWl0AaEvDwIFOZeQVVlBs4ERT56xg7z908+/qAsBDNAycaOaC1XwNAEd6rlvoQcYoNPOz6gLATTQMnEgm2b0UGzhN0p60DMYnNFP5xRbASwNAI3GSBoITJaakplJ04CSDQ+Zwiyp0c+iLmv+VAGCFAFazwpFeC317K0UHTpGRV/gpe/+hoTW1BYC5NBCcqFXH4NKC0rIzFB84wYTpy1j8Bx2F1RYAetFAcKoV66JjKT4ItPySsnNc/ANNBdUWAH5LA8GpuvWZQABAwC1atjGW8QhN/aa2ANBcXKCR4FBnD2XllVCEEEjtuoamMRahqetqDABWCGBrCxxryqzlLAZEwHwcnrCHcQhNlVxa76sLAMtpKDhV2y4j2Q6IgOny8vidjENoKtKTADCMhoKTbU/Yu4diBH9LTEnNZvxBY1M8CQBP0lBwsn7DZkZQkOBv/YbNYPEfdNbWkwDwfRoKDncqLTO3mKIEf0nNzP1E+t1pxh409sM6A4AVAipoLDjZ8LELuCAIfhM6cUkM4w4aK6uu1tcUALbRYHC4o1n5RUcpTrBbTmHJmVYdg48w5qCxdfUJABNpMDjd+Onv8xYAtps6eznf/UN3r9cnADxPg8Hp5FNZSV5x6SmKFGy79Ce34IT0s08Zb9Dco/UJAD+mwaCD2Ys+iqRQwS7BYQv57h+6u3DpCYC1BgArBBTRcHC6Np1GZBeWlVdSrOBr+w9nl6sdJ4wzaC6tpjpfWwB4n4aDDt5buTWGggWf7/t/bUYc4wsusMibANCThoMO2nUNPUjBgi8l7D6YI33rPOMLLtDTmwBwDw0HXazbEp9E4YKvdO0zgTP/4Ra/9iYANBLlNB508MKLo1MoXPCFzVFJBxhTcMupqeLyegcAKwSspAGhixXrouMpYGio518cTQCAW8TUVuPrCgCv0IDQxbOdQzIKSsvPUcTgrWVrIpIYS3CREQ0JAPfSgNDJrIWcCwDv5JeUVUqIzGEcwUV+15AA0FhwCha0Oh0wu6D4OAUN9fXWgjUc+Qs3OSYu8zoAWCFgHQ0JnYROXMIdAaiXrPyikxIeyxg/cJHVddV3TwLAQBoSmjmempFbRGGDp14Nns2RvzBm/399AsCDNCR002/YDNYCwCNbo3fut85LZ+zATe70RQC4TH2iojGhmcqkPWmHKXCoTW5x6ZlnO4dkM17gMll11XaPAoAVAlbToNBNl5fH76DIoY7b/qIZK3Ch2b4MAEE0KHT0/urw7RQ6VCc2aV+6elPEOIELPePLAPCdllyMAT23BZZm5BZUUPBQVUFpWeVzXUMPMUbgQqpWX+ezAGCFAFbJQksvD34ziqKHqsZNW8qrf7hVvKd1vT4BgO2A0NbazXGsB8B/7Nx7SJ32d5pxAROP//U2ANxFw0JXrYNG5GUXFn9GATRbYVn5xRd6jNnHmICpx/96FQCsEJBG40JXrwbP5oRAw82Yv5qvMuFm5XUd/9uQABBGA0PnxTHhMcnJFEIz7UvLLOZME7jcnPrU9PoGgIdpYOjs2c4h6XklpacoiObp/PK4XYwBuNwjdgYAdTtgKY0MnY0Yt2gLBdEsE2d+sJ2+D17/NyAAWCFgHg0NzZ2N27V/P4XRDBsjEvdy4A8MMLe+9dybAPAUDQ3dPdc1dH9Bafk5CqS7HTicXdaqY3A5fR4GeNQfAeBqcZLGhu4mzFjGVwEull9SWvn8i6MP0NdhgIr6vv73KgBYIWAVDQ4XOLn7QHo6xdKdXh0xO5Y+DkO87U0t9zYAPEODwxVfBXQL3ceuAPdZ8uHmRPo3DPKYPwPAFeIIjQ43GPDGW+EUTfeITz6QxdeUMIiqxZf7LQBYIWAmDQ+3kE+MXBvsAhl5hSee7RySS5+GQeZ5W8cbEgBa0PBwkeOJKakZFFGdz/mvuNi970QO+4FpHvd7AOBuALjwlMDM/JIytgZqaurs5Sz6g2k+8fb1vy8CwFAeANwkI6/wKMVUT70HTd1BH4ZhZjekhjc0APxAXOAhgAAAAgDgd/cHLABYIWAbDwEEABAAAL9KaWj99kUAeIEHAQIACACAX/V2QgC4piV3bIMAAAIA4C+nxHUBDwBWCFjEAwEBAAQAwC+W+KJ2+yoA/JUHAgIACACAX/zRSQGgseD0LRAAQAAA7HXIF3XbZwGAMwFAAAABAPCLQU4MAP9jLUzgAYEAAAIA4HvnxI2OCwBWCJjHAwIBAAQAwBYrfFmzfR0AfskDAgEABADAFo87NgBYISCShwQCAAgAgE+phfaNnR4AnuZBgQAAAgDgUwN9Xa/tCABNRDYPCwQAEAAAnzgqvuX4AGCFgAE8MBAAQAAAfGKcHbXargBwnTjBQwMBAAQAoEHOilu0CQBWCJjJgwMBAAQAoEEW2lWn7QwAd/PgQAAAAQBokHu0CwBWCNjEwwMBAAQAwCvr7azRdgeAJ3iAIACAAAB45U86B4BGIpmHCAIACABAvSTaWZ9tDwBWCPgnDxIEABAAgHpp5YYAwFsAEABAAAA8l6EO1dM+APAWAAQAEACAeunpj9rsrwDAWwAQAEAAAOpWLK52TQDgLQAIACAAAB7p7a+67M8AwFsAEABAAABqliOaui4A8BYABAAQAIBaBfmzJvs7APAWAAQAEACAr0vzx8r/gAUA3gKAAAACAFCtNv6ux4EIALwFgGPlFZeepphqGwDi6cPQVIqqja4PALwFgIOdpJDqq//rM2Pow9DUk4GoxYEKAOotQAIPHU7SOii4mEKqr+CwhdH0Y2goLhB1OGABwAoBD/Pg4SRtu4w8TCHV16SZHxAAoKO/GBcArBDwPg8fTtGpd1gShVRfb7+zPpZ+DM1sDWQNDnQAuFWcohPACYLDFoZTSPW1fuuOFPoxNNPC2ABghYBQOgGc4MOPIuMppPrKyC04Ls/xAn0ZmlgZ6PrrhABwjSiiMyDQ9h/OLqSQ6u3ZziHZ9GVoQL35vt34AGCFgCA6BAKpTdCIPAqo/l4ePC2O/gwNDHdC7XVKAGgsdtEpEChvjF0QQQHV39wl6wgAcLoscRUB4Ksh4A90DARK3K79aRRQ/aXnFhyV53mGPg0H+5dT6q5jAoAVApbTOeD3/f+dQ9Ipnu7Rvd9E7gSAU210Us11WgC4Q5ymk8Cfpsxezut/F1m+NpI7AeBEZ8VdBIDaQ8BYOgr8pVXH4JLcohLuAHCR/JKyM/Jci+nfcJgwp9VbJwaA5mwLhL+8OXdlFEXTfWbOXx1B/4aDFKgt7wQAz0LA03QY2K11UHCRfPrn+l93vgU426bTiDz6ORyinRNrrSMDgBUCPqTTwOaT/xIplu618P2NbAmEE0Q5tc46OQDcJI7QeWCHV4ZMi6VIultBafmF518cvZ/+jgCqFL8gAHgXAjrQgeD7V/8jCjPzCj+jSLrfntSMwlYdhx+j34OFf5oFACsEbKITwYdOb4neuY/iaI53lm9JoN8jAA6KKwkADQsAt4njdCb4wPllayJ2UBTN0/e1GbH0f/hzrmkZ4Kt+XREArBDwEh0KDTVzwRq2/Jm7K+Bcl5fH72QcgFf/+gUAdVkQCR7eujB++vuc9mc4teWzQ88xexgPMP3Vv1YBwAoBd3PJB7xwcunKbaz4x39k5RedaN991EHGBUx+9a9dALBCwDA6GOpzzG9UfAoL/vAVOYUlp3oNnMJ9ATD21b+uAeBykUInQ1269Z0YfzAjp5iCh5pMnvVhtLVPmzEDo179axkArBDwK74KQI17/DsGFy9bExFHgYMnNkYkpnBkMEx79a9tALBCQB86HC5x9tXg2ZEZeYWfUthQr8WBxaVnxk59L0r60AnGEUx49a97AGgk1tPpoPToPzl294HD2RQzNMT+Q1lFvQZOUfcHXGBcwc2v/rUOAFYI+E5Lrg022gs9xqREssgPPrYj+WB6j/6T4gkC8OTNo7hf1zqqbQCwQsAjDFLzPNs5JGPF+ugEihUIAgiwPjrXUK0DgBUCwuiE5izwm7N4bVRBaXklBQoEAQTYat3rpxsCgNoamEhndLXPxkx5NzynsOQEBQkEAThAjrieAOCMEPAjwZWfLvx+bVDw7MhD2XnlFCAQBOAQ58RDbqidrggAVghoT8d008r+SXGs7AdBAA40wC110zUBwAoBi+mcrOwHCAKwyTq1DZ0A4MwA0Eyk00lZ2Q8QBOBj6sTIG9xUM10VAKwQ8Gtxms6qycr+oOCSOYvXRrOyHwQBOJi6M+K3bquXrgsAVgjoQIfVYmV/BCv7QRCABoa4sVa6MgBYIWASnda5K/vTsljZD3OCwIsEAZ1tdNP3/qYEgCZiC53XWSv7k/ezsh8EAeYDbWS67Xt/IwKAFQKuFxl04sCv7I+I283KfoAgoBN1tszP3FwjXR0ArBBwj/q+mc7Myn6AIAAPnRdPuL0+uj4AWCHgXwwyVvYDBAF4qL8JtdGIAGCFgDfo1P5Z2Z9dWMzKfoAgoKv5ptRFkwJAI7GCzm3P2dis7AcIAi6wXTQlALgzBFwj9tLJfefFfpPiWdkPEARcIFv8j0k10agAYIWAO0QFnb3BK/v3sLIfIAi45etL8b+m1UPjAoAVAv4kztDpvVrZn7liXRQr+wGCgJtW/P/DxFpoZACwQkAr68EzADxZ2d+Rlf2AY4JAP4KADw0ytQ4aGwCsENCTzl+n46zsBwgCLjXP5BpodACwQkAIg6CGlf3DZ0Wxsh9wfBA4TBDwyip1ZDwBgBAwh8HAyn6AIGCMcHGl6bWPAPDfi4NWsbJ/zJ7IuN37mUwBgoCL7RTNqX0EgKoh4EoRzcp+AAQB10ozba8/AcDzEHCtSQcFqZX9sxexsh8gCBghT/yAWkcAqC0E3CxyXL+yf/K7kazsBwgChigXd1PjCACehIC7rA7Dyn4ABAH9T/m7n9pGAKhPCHjQ6jiuWdm/ax8r+wEYFQTUia9/oaYRALwJAQ+LY3qv7B+tzuxnZT+A2oJAnAuDQKX4N7WMANCQEPAbHUOAWtm/nJX9AMwMAuqY9w7UMAKAL0LAQ+KoXiv7y1jZD8DEIKA++T9H7SIA+DIEtHB4CGBlPwDTg8A50ZqaRQCwa2Hgp07r8APVyv7MXFb2A7AhCBw4pEkQOCueplYRAOwMAQ84JQSwsh8AQeDL1f5PUqMIAP4IAfeLT1jZD4AgEHCnxN+oTQQAf4aAX4sjrOwHQBAIWPE/Kf6PmkQACEQIuM8fIYCV/QAIAl9f+Cz+SC0iAAQyBPxKlNjVwUdPfoeV/QAIAl+lzmb5LTWIAOCEEPBDcciXHbxH/8lxBzNySplYAOgWBLr1mbDDxuKv1l+1oPYQAJwUAm4Q8Q1+3R80omD1xzGJTCQAdLZ+645dbTuHZPi4+KubWn9KzSEAODEEXC3WeHt61dCRcyOyC4uPM3kAcIP8krJzU2Yvj2rV0SfHqSeL71FrCABODgFNxFv16djtuoYe2J64l219AFwpLTO3os/Q6bENWB+wUTSjxhAAdAkCQz3p2MNGz4soKC0/xyQBwO0i41PSnusWWt/1UvPEZdQVAoBuIeB563jK6jr1iXdXbI1lUgBg1tcCpecGj5gT62HxH04tIQDoHAIeufQ64TadRuTF7zpwmMkAgKmWrtyWaO3lr+lSnyBqCAHALWcFFKqO3al3WHJ6bsGnTAAATLdr36Hcdl1GHq5mj/+j1A4CgJtCwK0jJyxeW1Bafp6BDwCfyyksOWUtELxofVD6FTWDAOA60tlvFZzlDwCXmLNk3Sop/j+gVhAA3BwCrhAzGfAA8KW14jpqBAHAlCDQXnDGPwCTqQvOBotG1AUCgGkh4H/FISYBAAYqFn+iFhAATA4BzcVyJgMABokU36UGEADweRDoLzgREICbXRBjBSf7EQBwSQj4vShikgDgQp+Ip5jrCQCoOQTcZL0eY8IA4Ba7xB3M8QQA1B0CLhPjmDQAuMBscSVzOwEA9QsCT4ujTCAANKS2OT/PXE4AgPch4E6xh8kEgEbSxD3M4QQANDwEXC0WMakA0MAy0Yy5mwAA3waB7uI0EwwABzorXmKuJgDAvhDwS2tFLRMOAKfIES2YowkA8M8ugUHiFBMPgABS15tP45U/AQCBWSAYwSQEIAD2iYeYiwkACFwIaCS6ik+ZkAD4gVqHNEw0ZQ4mAMAZQeBmsZrJCYCNosRPmHMJAHBmEGglSpioAPiQesPYTb1xZJ4lAMDZIeB6sYBJC4APqOvKubqXAADNgsAjIosJDIAX8sU/mUsJANA3BHxTTLa26zCpAajLBTFDNGcOJQDAHUHgQWvbDhMcgJocEA8zZxIA4L4Q0FS8Ic4w0QGoQs0Jw9naRwCA+4PAz0Qckx4AsV3czdxIAIA5IaCxeE5kMgECRiqxLhhjax8BAIYGgctFT1HMhAgY4RMxVC0QZg4kAABf7BYYypHCgGudEKPFdcx5IACgpkOEwsRJJkzANQv83hQ3MceBAABP7xaYJc4xgQJaqrROBL2NOQ0EAHh75fBS63AQJlVADx+ysh8EAPgqCPxKbGBiBRxto7iPOQsEANgRBP4gYploAUeJUWOTOQoEAPgjCPxD7GXiBQJqt3iCOQkEAATiMKH23DgI+N0h0YZDfEAAgBPuGOjGZUOA7TJEZ3EZcw8IAHBaGPiTWGFtQWLCBnxzPe968bh668Y8AwIAnB4Evi9GiTImcMDrI3sniB8yp4AAAB2DwBXiBZHIhA54vLCvi7iaOQQEALglDLQQS6yjSZnogf86ax249VvmChAA4OYgcKMYJgqY+GG4QvGG+C5zAwgAMCkIXCZaiSgKAQyj+nxrdR03cwEIADA9DPxCzLGuLKVAwK3X8c4WP2fMgwAAfD0IXCf6WfudKRpwg8Oij7iWMQ4CAFB3EGhkLRocRxiAhorETPEXTusDAQBoWCD4pQgRBygucKgsa9/+wxzYAwIAYE8Y+IkYKnZRdBBgKpCOVNdlMzZBAAD8GwZut9YMxFpHplKUYLckMUQFUcYgCACAM8LA90RPsY27COBD50W0tZDvVsYaCACAs8PADaKTdYkKJw/Cm5P5Nlq3XN7ImAIBANAzDHxLtLNuKfyM4oYanBSrxPNqOypjBwQAwH2nD6rthYOtT3jHKXzGKhYrxQBr5f6VjBEQAABzAsHl1uSvdhVssT4FUhzdp9K6ZW+GeE7cQf8HAYBGAKoGgqbid9ZlRRtEGcVTS59Yz2+YdRjPNfRvgAAA1DcU3CZairHWDoOjFFhHUds/U8U80Vn8lNP3AAIAYNcxxXdZr5KniBgWF/qVautwESqeENfTLwECABDIYHCL+D/RW0y33hYUUrC9Vmi1ofre/iXxiPgBn+4BAgCg0zbEB8ULYoxYLhJFieGnF16wVuInWW0yytqC94BoTt8BCACAm8PBFeKH4k9W8XtNzLIOMNqn+XqDCmvl/UfWp/jB1tcmf1Cr8NXvTh8ACAAAat+q+B3rEqSHxONWIVVfNbwuJomFYo2IsO5FUJ+qU8RBkS5yrCtqy8Uxcco64va89c/HrH9XZP3ZdOuimxTrbUWs9b27OihnvphohRV19PKz4jHrLced1imMTXh2gLP9P2pbYb+i0ji9AAAAAElFTkSuQmCC',
    Position : 1 ,
    Status : 1
  };
   await this.firebase.database.ref('Employee').orderByChild("Email").equalTo(email).once("value",(value)=>
    {
        if (value.exists())
        {
          value.forEach((element)=>
          {
            this.key=element.key;
            this.user=element.toJSON();
           localStorage.setItem('currentUser', JSON.stringify(this.user));
            return;
          })
        }
    });
    this.loading=false;
  }
  Reset()
  {
    var data=JSON.parse(localStorage.getItem('currentUser'));
    this.user=data;
  }
  imageShow: any = '';
  onFileChanged(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imageShow = (<FileReader>event.target).result;
      this.user.Image = this.imageShow;
    }
  }
  compareDate(date)
{
 var date_now= new Date();
 var date0=new Date(date);
 console.log(date0>date_now);
    if (date0>=date_now) return true
    else return false;
}
  Update(form :NgForm)
  {
    if ( this.key!=null)
  this.firebase.database.ref('Employee/'+ this.key).update(
    {
      Firstname : form.value["Firstname"],
      Lastname : form.value["Lastname"],
      Phone : form.value["Phone"],
      Address :form.value["Address"],
      Birthday : form.value["Birthday"],
      Image : form.value["Image"],
   }
  ).then(async()=>
  {
   await localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.router.navigate(['']);
    this.toastr.success('Cập Nhật Tài Khoản Thành Công','Thành Công!',{timeOut: 1000});
  }
  ).
  catch((error)=>
  {
    this.toastr.error( 'Cập Nhật Tài Khoản Thất Bại','Thất Bại!',{timeOut: 1000});
  });
  }
}
