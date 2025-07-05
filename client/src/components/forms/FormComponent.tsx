import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { SocketEvent } from "@/types/socket";
import { USER_STATUS } from "@/types/user";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Code, LogIn, UserPlus } from "lucide-react";


const FormComponent = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser, status, setStatus } = useAppContext();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const createNewRoomId = () => {
    const newId = uuidv4();
    setCurrentUser({ ...currentUser, roomId: newId });
    toast.success("Created a new Room Id");
  };

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const validateForm = () => {
    if (currentUser.username.trim().length === 0) {
      toast.error("Enter your username");
      return false;
    } else if (currentUser.roomId.trim().length === 0) {
      toast.error("Enter a room id");
      return false;
    } else if (currentUser.roomId.trim().length < 5) {
      toast.error("ROOM Id must be at least 5 characters long");
      return false;
    } else if (currentUser.username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === USER_STATUS.ATTEMPTING_JOIN) return;
    if (!validateForm()) return;
    toast.loading("Joining room...");
    setStatus(USER_STATUS.ATTEMPTING_JOIN);
    socket.emit(SocketEvent.JOIN_REQUEST, currentUser);
  };

  useEffect(() => {
    if (currentUser.roomId.length > 0) return;
    if (location.state?.roomId) {
      setCurrentUser({ ...currentUser, roomId: location.state.roomId });
      if (currentUser.username.length === 0) {
        toast.success("Enter your username");
      }
    }
  }, [currentUser, location.state?.roomId, setCurrentUser]);

  useEffect(() => {
    if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
      socket.connect();
      return;
    }

    const isRedirect = sessionStorage.getItem("redirect") || false;

    if (status === USER_STATUS.JOINED && !isRedirect) {
      const username = currentUser.username;
      sessionStorage.setItem("redirect", "true");
      navigate(`/editor/${currentUser.roomId}`, {
        state: {
          username,
        },
      });
    } else if (status === USER_STATUS.JOINED && isRedirect) {
      sessionStorage.removeItem("redirect");
      setStatus(USER_STATUS.DISCONNECTED);
      socket.disconnect();
      socket.connect();
    }
  }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status]);

  return (
    <div className="w-full max-w-md rounded-xl bg-gray-800/50 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/10">
      <div className="mb-6 flex justify-center">
        <Code className="h-12 w-12 text-purple-500" />
      </div>

      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        {isSignUp ? "Create Room" : "Join Room"}
      </h2>

      <div className="mb-6 flex rounded-md bg-gray-700/50">
        <button
          type="button"
          className={`w-1/2 rounded-l-md py-2 text-sm font-medium transition-all duration-200 ${
            !isSignUp
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => setIsSignUp(false)}
        >
          <span className="flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" /> Join
          </span>
        </button>
        <button
          type="button"
          className={`w-1/2 rounded-r-md py-2 text-sm font-medium transition-all duration-200 ${
            isSignUp
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => {
            createNewRoomId();
            setIsSignUp(true);
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <UserPlus className="h-4 w-4" /> Create
          </span>
        </button>
      </div>

      <form onSubmit={joinRoom} className="space-y-4">
        <div>
          <label
            htmlFor="roomId"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Room ID
          </label>
          <div className="relative">
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={currentUser.roomId}
              onChange={handleInputChanges}
              placeholder="Enter Room ID"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
            {isSignUp && (
              <button
                type="button"
                onClick={createNewRoomId}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                Generate
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameRef}
            value={currentUser.username}
            onChange={handleInputChanges}
            placeholder="Choose a username"
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-center text-base font-medium text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {isSignUp ? "Create & Join" : "Join"}
        </button>
      </form>

      {!isSignUp && (
        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have a room ID?{" "}
          <button
            onClick={() => {
              createNewRoomId();
              setIsSignUp(true);
            }}
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Create one
          </button>
        </p>
      )}
    </div>
  );
};

export default FormComponent;
