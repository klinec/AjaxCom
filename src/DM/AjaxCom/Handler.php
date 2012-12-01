<?php

namespace DM\AjaxCom;

use Responder\Container\FlashMessage;
use Responder\Container\Container;
use Responder\Modal;

class Handler
{

    const TYPE_CONTAINER = 'containers';
    const TYPE_MODAL = 'modals';
    const TYPE_CALLBACK = 'callback';
    const TYPE_CHANGEURL = 'changeurl';

    /**
     * Collection of ResponderInterface objects
     *
     * @var array $queue
     */
    private $queue = array();

    /**
     * Add ResponderInterface object to the queue
     *
     * @var ResponderInterface $responder
     * @return Handler
     */
    public function register(ResponderInterface $responder)
    {
        return $this;
    }

    /**
     * Remove ResponderInterface object from the queue
     *
     * @var ResponderInterface $responder
     * @return Handler
     */
    public function unregister(ResponderInterface $responder)
    {
        return $this;
    }

    /**
     * Create a FlashMessage and register it to the queue
     *
     * Convenience method to allow for a fluent interface
     *
     * @var string $message
     * @var string $type
     * @return FlashMessage
     */
    public function flashMessage($message, $type = FlashMessage::SUCCESS)
    {
    }

    /**
     * Create a Container and register it to the queue
     *
     * Convenience method to allow for a fluent interface
     *
     * @var string $identifier
     * @return Container
     */
    public function container($identifier)
    {
    }

    /**
     * Create a Modal and register it to the queue
     *
     * Convenience method to allow for a fluent interface
     *
     * @return Modal
     */
    public function modal()
    {
    }

    /**
     * Create a Callback and register it to the queue
     *
     * Convenience method to allow for a fluent interface
     *
     * @var string $function
     * @return Callback
     */
    public function callback($function)
    {
    }

    /**
     * Create a ChangeUrl and register it to the queue
     *
     * Convenience method to allow for a fluent interface
     *
     * @var string $url
     * @return ChangeUrl
     */
    public function changeUrl($url)
    {
    }

    /**
     * Generates respond
     * @return 
     */

    public function respond()
    {

        $response = array();
        $containerObject = new \stdClass();
        $containerObject->operation = 'container';
        $containerObject->options = array(
                                            'target' => '#1234',
                                            'method' => 'append', //append, prepend, remove, replace
                                            'value' => 'my new HTML',
                                            );
        
        $response[self::TYPE_CONTAINER][] = $containerObject;
        

        $animationObject = new \stdClass();
        $animationObject->removeAfter = 0; //0=sticky, (int) milliseconds



        $containerObject2 = new \stdClass();
        $containerObject2->operation = 'container';
        $containerObject2->options = array(
                                            'target' => '#1234',
                                            'method' => 'append', //append, prepend
                                            'animation' => $animationObject,
                                            'value' => 'my new HTML',
                                            );
        
        $response[self::TYPE_CONTAINER][] = $containerObject2;


        $containerObject3 = new \stdClass();
        $containerObject3->operation = 'modal';
        $containerObject3->options = array(
                                            'target' => '#id_of_modal',
                                            'value' => 'my new HTML',
                                            );
        

        $response[self::TYPE_MODAL][] = $containerObject3;

        $response[self::TYPE_CALLBACK] = 'function name';

        $response[self::TYPE_CHANGEURL] = 'new url';

        
        echo json_encode($response);
    }

}
