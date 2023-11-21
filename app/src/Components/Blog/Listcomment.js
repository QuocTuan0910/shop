
function Listcomment(props){
  function handleClick(e){
    let{getReply} =props
         let x = e.target.id;
         getReply(x)
  }
    function renderComment(){
      let {listCmt} = props
        if(listCmt.length > 0){
            return listCmt.map((value, key) =>{
              if(value["id_comment"] == 0){
                return(
                  <div>
                    <li key={key} className="media">
                          <a className="pull-left" href="#">
                        <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li><i className="fa fa-user" />{value["name_user"]}</li>
                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <p>{value["comment"]}</p>
                        <a id={value["id"]} className="btn btn-primary" href="#cmt" onClick={handleClick} ><i className="fa fa-reply" />Replay</a>
                      </div>
                    </li>
                     {
                      listCmt.map((value2, key2) =>{
                        if(value2["id_comment"] == value["id"]){
                          return(
                              <li key={key} className="media second-media">
                            <a className="pull-left" href="#">
                              <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                            </a>
                            <div className="media-body">
                              <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user" />{value2["name_user"]}</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                              </ul>
                              <p>{value2["comment"]}</p>
                              <a id={value2["id"]} className="btn btn-primary" href="#cmt" onClick={handleClick} ><i className="fa fa-reply" />Replay</a>
                            </div>
                              </li>
                          )
                        }
                      })
                    }
                  </div>
                )
              }
             
            })
        }
       
    }
    
    // function renderReply(){
    //   let {listCmt} = props
    //   if(listCmt.length > 0){
    //       return listCmt.map((value, key) =>{
    //           return(
    //         <li key={key} className="media second-media">
    //       <a className="pull-left" href="#">
    //         <img className="media-object" src="images/blog/man-three.jpg" alt="" />
    //       </a>
    //       <div className="media-body">
    //         <ul className="sinlge-post-meta">
    //           <li><i className="fa fa-user" />{value["name_user"]}</li>
    //           <li><i className="fa fa-clock-o" /> 1:33 pm</li>
    //           <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
    //         </ul>
    //         <p>{value["comment"]}</p>
    //         <a id={value["id"]} className="btn btn-primary" href="#cmt" onClick={handleClick} ><i className="fa fa-reply" />Replay</a>
    //       </div>
    //     </li>

    //           )
    //       })
    //   }
    // }





    return(
        <ul className="media-list">
        {/* <li className="media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-two.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li> */}
        {renderComment()}
        {/* {renderReply()} */}
        {/* <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
        <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
        <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
        <li className="media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-four.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
        <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
        <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
        <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user" />Janis Gallagher</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
          </div>
        </li> */}
      </ul>	
    )
}
export default Listcomment;