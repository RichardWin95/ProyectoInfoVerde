from flask import Flask, render_template,jsonify
from config import DevelopmentConfig
from models import db, json
from  datetime import datetime
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

@app.route("/")
def menu():
    return render_template('index.html')
@app.route('/api/consumoE')
def consumoElectrico():
    query = db.engine.execute(
        "SELECT BAS_OFICINA.ofi_dscrpcion,BAS_OFICINA.ofi_anio,TRN_DETALLE_MUESTRA.det_enrgia_cnsmda FROM (TRN_DETALLE_MUESTRA "
        "INNER JOIN BAS_OFICINA on TRN_DETALLE_MUESTRA.id_Oficina = BAS_OFICINA.ofi_serial)")
    series = listGraphics(query)
    response = json.dumps(series)
    response = jsonify(response)
    return response

@app.route('/api/CO2e')
def produccionCO2e():
    query = db.engine.execute(
        "SELECT BAS_OFICINA.ofi_dscrpcion,BAS_OFICINA.ofi_anio,TRN_DETALLE_MUESTRA.det_co2e_gnrdo FROM (TRN_DETALLE_MUESTRA "
        "INNER JOIN BAS_OFICINA on TRN_DETALLE_MUESTRA.id_Oficina = BAS_OFICINA.ofi_serial)")
    series = listGraphics(query)
    response = json.dumps(series)
    response = jsonify(response)
    return response
@app.route('/api/detailSample')
def dataSetConsumo():
    lista = list()
    query = db.engine.execute(
        "SELECT BAS_OFICINA.ofi_dscrpcion,BAS_OFICINA.ofi_anio,TRN_DETALLE_MUESTRA.det_enrgia_cnsmda,"
        "TRN_DETALLE_MUESTRA.det_co2e_gnrdo FROM (TRN_DETALLE_MUESTRA "
        "INNER JOIN BAS_OFICINA on TRN_DETALLE_MUESTRA.id_Oficina = BAS_OFICINA.ofi_serial)")
    for row in query:
        response = {'sala': row[0], 'anio': row[1], 'consumo': row[2], 'co2e': row[3]}
        lista.append(response)
    response = json.dumps(lista)
    response = jsonify(response)
    return response
def listGraphics(query):
    Ddiez = 2010
    A = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    B = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    C = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    D = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    E = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    F = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    G = ("null " * (datetime.now().year - 2010)).split(" ")[:]
    for row in query:
        if row[0] == 'A':
            A[int(row[1]) - Ddiez] = row[2]
        elif row[0] == 'B':
            B[int(row[1]) - Ddiez] = row[2]
        elif row[0] == 'C':
            C[int(row[1]) - Ddiez] = row[2]
        elif row[0] == 'D':
            D[int(row[1]) - Ddiez] = row[2]
        elif row[0] == 'E':
            E[int(row[1]) - Ddiez] = row[2]
        elif row[0] == 'F':
            F.insert(int(row[1]) - Ddiez, row[2])
        elif row[0] == 'G':
            G[int(row[1]) - Ddiez] = row[2]
    series = [{"name": 'Sala A', "data": A}, {"name": 'Sala B', "data": B}, {"name": 'Sala C', "data": C}
        , {"name": 'Sala D', "data": D}, {"name": 'Sala E', "data": E}, {"name": 'Sala F', "data": F},
              {"name": 'Sala G', "data": G}
              ]
    return series



if __name__ == '__main__':
    db.init_app(app)
    app.run(port=8000, host='0.0.0.0')
