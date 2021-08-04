from flask import Flask, render_template, request,jsonify, url_for, redirect, session,Response
import pymongo
from pymongo import MongoClient
from hashlib import sha256
import json 
import asyncio
import requests
import urllib
import time
import random
from pymongo import message
import datetime as dt
mineurl =["http://139.180.187.234/mine_worker?account=","http://45.76.146.242/mine_worker?account="]


client = MongoClient('mongodb://localhost:27017/dbtests')
db = client.dbtests
db.test.create_index([('username', pymongo.ASCENDING)], unique=True)
db.testcode.create_index([('code', pymongo.ASCENDING)], unique=True)
db.testvip.create_index([('wam', pymongo.ASCENDING)], unique=True)

app = Flask(__name__)
app.secret_key = "super secret key"

loadb = 0



@app.route("/register", methods=["POST", "GET"])

def register():
    if request.method == "POST":
        user = request.json.get("username")
        password1 = request.json.get("password1")
        password2 = request.json.get("password2")
        #if found in database showcase that it's found 
        user_found = db.test.find_one({"name": user})
        if user_found is not None:
            message = 'There already is a user by that name'
            return Response(message, status=500)
            #return render_template('index.html', message=message)
        if password1 != password2:
            message = 'Passwords should match!'
            return Response(message, status=500)
        else:
            #hash the password and encode it
            ###hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            #assing them in a dictionary in key value pairs
            ###user_input = {'name': user, 'email': email, 'password': hashed}
            #insert it in the record collection
            try :db.test.insert_one(
            {
                'username': user,
                'password': password2,
            })
            except :
                return Response("duplicate id", status=500)
            
            #find the new created account and its email
            #user_data = db.tests.find_one({"email": email})
            #if registered redirect to logged in as the registered user
            return Response("regissuccess", status=200)
            #return render_template('logged_in.html', username=new_user)
    return Response("{'a':'b'}", status=500)

#@app.route('/logged_in')

#def logged_in():
    if "username" in session:
        username = session["username"]
        return render_template('logged_in.html', username=username)
    else:
        return jsonify({"1111":"1111"})
        #return render_template('login.html')
        #return redirect(url_for("login"))

@app.route("/login", methods=["POST", "GET"])

def login():
    message = 'Please login to your account'
    #ถ้ามีsession ยุแล้วจะกลับไปหน้าล็อคอินแล้ว
    #if "username" in session:

     #   return jsonify({"123":"123"})
        #return redirect(url_for("logged_in"))
    #กดล็อคอินมา
    if request.method == "POST":
        username = request.json.get("username")
        password = request.json.get("password")

    #check if user exists in database
        user_found = db.test.find_one({"username": username})
        if user_found:
            user_val = user_found['username']
            passwordcheck = user_found['password']
            
            if passwordcheck == password :
            #if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                #session["username"] = user_val
                message = 'Log in success'
                return Response(message, status=200)
            else:
                message = 'Wrong password'
                return Response(message, status=500)
        else:
            message = 'User not found'
            return Response(message, status=500)
            #return render_template('login.html', message=message)
    return Response(message, status=500)
    #return render_template('login.html', message=message)


@app.route('/addwax', methods=["POST", "GET"])
def addwax():
    username = request.json.get("username")
    wid = request.json.get("waxlist")
    data =  list(wid)
    for i in range(len(data)) :
        dataB = db.test.find_one({'$and': [{'username':username},{'wid.id': data[i]}]})
        if dataB is None:
            db.test.update_one({'username' : username},{'$push':{'wid':{'id':data[i],'vip':"0",'code':"",'vipstart':"",'vipend':""}}} )
            #dataA = db.test.find({"username": username})
            #for item in dataA:
            #    temp = int(item['idcount'])
            #    temp +=1
        #user = db.test.find_one({"username": username})
            #    db.test.update(  {"username": username},{ '$push': { "aid": cid , "nonce": nonce , "vip": vip }})
            #    db.test.update({"username": username},{'$set':{"idcount": temp}})
            #    return jsonify({"yo":"add id success"})
        else:
            message = 'already have id in this user'
            return Response(message, status=500)
    message = 'add wam successful'
    return Response(message, status=200)


#@app.route("/logout", methods=["POST", "GET"])

#def logout():
    if "email" in session:
        session.pop("email", None)
        return render_template("signout.html")
    else:
        return render_template('index.html')

#ลบไอดีalien
@app.route('/deletewax', methods=['GET','POST'])
    
def deletewax():
    user = request.json.get("username")
    cid = request.json.get("wax")
    code = request.json.get("code")
    dataB = db.test.find_one({'$and': [{'username':user},{'wid.id': cid}]})
    if dataB is None:
        message = 'wam account not found'
        return Response(message, status=500) 
    else:
        db.testcode.update({ 'hash': { '$regex': code } },{'$pull':{'wam': cid}})
        db.testvip.delete_many({"wam": cid})
        db.test.update({'username' : user},{'$pull':{'wid':{'id':cid}}} )
        message = 'delete success'
        return Response(message, status=200)

#update nonce
#@app.route('/wnonce', methods=['GET','POST'])
#def wnonce():
    non = request.json.get("nonce")
    user = request.json.get("user")
    wid = request.json.get("wid")
    dataB = db.test.find_one({"username": user,"wid":[{'id':wid}]})
    if dataB is None:
        return jsonify({'error':'erorrororo'})
    else:
        db.test.update_one({'$and': [{'username':user},{'wid.id': wid}]},{'$set':{'wid.$.nonce':non}})
        return jsonify({'success':"updatenon"})

@app.route('/waxlist', methods=['GET','POST'])
def waxlist():
    user = request.json.get('username')
    dataA = db.test.find_one({'username':user})
    if dataA is None:
        message = "wam not found"
        return Response(message, status=500)
        print(dataA['wid'])
    else :
        yo = dataA['wid']
        yoo = json.dumps(yo, default=str)
        return Response(yoo, status=200)

@app.route('/reqnonce', methods=['GET','POST'])
def reqnonce():
    wid = request.json.get("wid")
    dataA = db.testvip.find_one({"wam": wid })
    if dataA is None:
        message = 'no wam account in vip'
        return Response(message, status=500)
    else : 
        yo = dataA['nonce']
        yoo = json.dumps(yo)
        return Response(yoo, status=200)

#showไอดีalien
#@app.route('/showaid', methods=['GET','POST'])

#def showaid():
    user = request.json.get("username")
    dataB = db.test.find({"username":user})
    for item in dataB :
        temp = str(item['aid'])
    return jsonify({'error:':temp})

@app.route('/addcode', methods=['GET','POST'])
def addcode():
    username = request.json.get("username")
    wid = request.json.get("wax")
    code = request.json.get("code")
    a = dt
    b = dt
    dataB = db.test.find_one({"username": username,"wid.id":wid})
    if dataB is None:
        message= 'wax id not found '
        return Response(message, status=500)
    else :
        dataA = db.testcode.find_one({ 'hash': { '$regex': code } })
        if dataA is None:
            message = "wrong code"
            return Response(message, status=500)
        else:
            count = dataA['count']
            leng = len(dataA['wam'])
            if leng >= int(count) :
                message = "vip code already full"
                return Response(message, status=500)
            else : 
                dataC = db.testcode.find_one({'$and':[{'hash':{'$regex':code}},{'wam': wid}]})
                dataD = list(db.testcode.find({'hash':{'$regex':code}}))
                for item in dataD :
                    b = item['start']
                    a = item['stop']
                                  
                if dataC is None :
                    db.testcode.update_one({ 'hash': { '$regex': code } },{'$push':{'wam': wid}})
                    db.test.update_one({'$and': [{'username':username},{'wid.id': wid}]},{'$set':{'wid.$.vip':1}})
                    db.test.update_one({'$and': [{'username':username},{'wid.id': wid}]},{'$set':{'wid.$.code':code}})
                    db.test.update_one({'$and': [{'username':username},{'wid.id': wid}]},{'$set':{'wid.$.vipstart':b}})
                    db.test.update_one({'$and': [{'username':username},{'wid.id': wid}]},{'$set':{'wid.$.vipend':a}})
                    db.testvip.insert_one({'wam':wid,'nonce':'default',})
                    message = "add vip succesful"
                    return Response(message, status=200)
                else :  
                    message = "already have id in this code"
                    return Response(message, status=500)

@app.route('/mine_worker', methods=['GET'])
def mineworker():
    global loadb
    wam = []
    nonce = []
    texxt = 'wam not found'
    yo = ''
    #minurl = mineurl[random.randint(0,1)]
    user = request.args.get('account')
    dataA = list(db.testvip.find({'wam': user }))
    for item in dataA :
        wam.append(item['wam']) 
        nonce.append(item['nonce'])
    try:
        yo = "%s"%(mineurl[0])+wam[0]+'&nonce='+nonce[0]
        if loadb == 2 :
            yo = "%s"%(mineurl[1])+wam[0]+'&nonce='+nonce[0]
        r = requests.get(yo)
        texxt = r.text
        print(r.text) 
        if len(texxt) >= 20 :
            pass
        else : 
            db.testvip.update_one({'wam' : wam[0]},{'$set':{'nonce':texxt}})
            loadb += 1
            if loadb > 2 :
                loadb = 0
            return Response(texxt, status=200)
    except :     
        pass
    return Response(texxt, status=500)

@app.route('/gencode', methods=['GET','POST'])
def gencode():
    code = request.json.get("code")
    hash = request.json.get("hash")
    count = request.json.get("count")
    try:
        date_1 = dt.datetime.today()
        date_2 = date_1 + dt.timedelta(days=31)
        db.testcode.insert_one(
            {
                'code':code,
                'hash':hash,
                'wam': [],
                'count': count,
                'start' : date_1,
                'stop' : date_2,
            }
        )
        message = 'add code successful'
        return Response(message, status=200)
    except : 
        message = 'dup code'
        return Response(message, status=500)


@app.route('/getallvip', methods=['GET','POST'])
def getallvip():
    wam = []
    nonce = []
    dataA = list(db.testvip.find())
    for item in dataA :  
        wam.append(item['wam']) 
        nonce.append(item['nonce'])
    #print(wam)
    #print(nonce)
    x = zip(wam,nonce)
    #print(tuple(x))

    a = tuple(x)
    yoo = json.dumps(a)
    return Response(yoo, status=200)
    
@app.route('/mineupdate', methods=['GET','POST'])
def mineupdate():
    wwam = request.json.get("wam")
    nnonce = request.json.get("nonce")
    wam = []
    nonce = []
    texxt = 'wam not found'
    yo = ''
    #minurl = mineurl[random.randint(0,1)]
    user = request.args.get('account')
    dataA = list(db.testvip.find({'wam': wwam }))
    if dataA is None: 
        texxt = 'id not found'
        return Response(texxt, status=500)
    else :
        for item in dataA :
            wam.append(item['wam']) 
            nonce.append(item['nonce'])
            if nnonce == nonce[0] :
                texxt = 'same nonce'
                return Response(texxt, status=500)
            else :
                try:
                    db.testvip.update_one({'wam' : wam[0]},{'$set':{'nonce':nnonce}})
                    texxt = 'update success'
                    return Response(texxt, status=200)
                except :     
                    pass
    return Response(texxt, status=500)

@app.route('/allcode', methods=['GET','POST'])
def allcode():
    y = []
    dataA = db.testcode.find()
    for item in dataA :
        y.append(item['code'])
    x =json.dumps(y)
    return Response(x, status=200)

@app.route('/codeinfo', methods=['GET','POST'])
def codeinfo():
    code = request.args.get('code')
    y = []
    dataA = db.testcode.find({'code': code })
    for item in dataA :
        item = str(item)
        y.append(item)
    x =json.dumps(y)
    return Response(x, status=200)

@app.route('/delcode', methods=['GET','POST'])
def delcode():
    code = request.json.get('code')
    y = []
    try :
        dataA = db.testcode.find({'code': code })
        for item in dataA :
            y = (item['wam'])
        #print(y[0])
        for i in range(len(y)) :
            dataB = db.test.find_one({'wid.id': y[i]})
            if dataB == None :
                texxt = "wam not found in user id "
                return Response(texxt, status=500)
            else :
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.vip':0}})
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.code':""}})
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.vipstart':""}})
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.vipend':""}})
                db.testvip.delete_one({'wam': y[i]})
        db.testcode.delete_one({ 'code': { '$regex': code }})
        texxt = "delete success"
        return Response(texxt, status=200)
    except : 
        texxt = 'code not found'
        return Response(texxt, status=500)

@app.route('/plusday', methods=['GET','POST'])
def plusday():
    code = request.json.get('code')
    dataA = db.testcode.find_one({'code': code })
    dataB = db.testcode.find({'code': code })
    yy = []
    olddays = dt.datetime.today()
    if dataA is None:
        texxt = "code not found"
        return Response(texxt, status=500)
    else :
        for item in dataB :
            olddays = item['stop']
            yy = (item['wam'])
        newdayss = olddays + dt.timedelta(days=30)
        db.testcode.update_one({'code': code },{'$set':{'stop': newdayss }})
        for i in range(len(yy)) :
            dataB = db.test.find_one({'wid.id': yy[i]})
            if dataB == None :
                texxt = "wam not found in user id "
                return Response(texxt, status=500)
            else :
                db.test.update_one({'wid.id': yy[i]},{'$set':{'wid.$.vipend':newdayss}})
        dataC = db.testcode.find({'code': code })
        for item in dataC :
            newdays = item['stop']
        newdays = str(newdays)
        texxt = "success"
        return Response(texxt+json.dumps(newdays), status=200)
        texxt = "error i sus call gu"
        return Response(texxt, status=500)

@app.route('/editcount', methods=['GET','POST'])
def editcount ():
    code = request.json.get('code')
    ncount = request.json.get('count')
    yy = []
    dataA = db.testcode.find_one({'code': code })
    dataB = db.testcode.find({'code': code })
    if dataA is None:
        texxt = "code not found"
        return Response(texxt, status=500)
    else :
        for item in dataB :
            y = item['count']
            print(y)
        try:
            if y > int(ncount) :
                texxt = "old count value morethan new"
                return Response(texxt, status=500)
        except :
            texxt = "input int i sus"
            return Response(texxt, status=500)
        db.testcode.update_one({'code': code },{'$set':{'count': int(ncount) }})
        dataC = db.testcode.find({'code': code })
        for item in dataC :
            u = item['count']
            print(u)
        texxt = "success"
        return Response(texxt, status=200)
        texxt = "error i sus call gu"
        return Response(texxt, status=500)

@app.route('/pups', methods=['GET'])
def pups():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080, debug=False)